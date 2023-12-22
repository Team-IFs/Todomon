package com.ifs.back.security.oauth;

import com.ifs.back.member.entity.Member;
import com.ifs.back.member.repository.MemberRepository;
import com.ifs.back.security.dto.GoogleResponse;
import com.ifs.back.security.jwt.JwtTokenizer;
import com.ifs.back.todomon.entity.Todomon;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.web.reactive.function.client.WebClient;

@Service
@EnableAsync
@RequiredArgsConstructor
public class AuthService {

  private final MemberRepository memberRepository;
  private final JwtTokenizer jwtTokenizer;

  public Member getMemberByToken(String accessToken) {
    GoogleResponse googleResponse = WebClient.create().get()
        .uri("https://www.googleapis.com/oauth2/v3/userinfo?access_token="+accessToken)
        .accept(MediaType.APPLICATION_JSON)
        .retrieve()
        .bodyToMono(GoogleResponse.class)
        .block();

    Member findMember = memberRepository.findByEmail(googleResponse.getEmail())
        .orElse(null);

    if (findMember == null) {
      Member createdUser = Member.builder()
          .email(googleResponse.getEmail())
          .nickname(googleResponse.getName())
          .password(new BCryptPasswordEncoder().encode(UUID.randomUUID().toString().substring(0, 6)))
          .roles(List.of("USER"))
          .todomon(new Todomon())
          .build();
      return memberRepository.save(createdUser);
    }
    return findMember;

  }

  public String delegateAccessToken(Member oAuth2User) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("username", oAuth2User.getEmail());
    claims.put("roles", oAuth2User.getRoles());

    String subject = oAuth2User.getEmail();
    Date expiration = jwtTokenizer.getTokenExpiration(
        jwtTokenizer.getAccessTokenExpirationMinutes());

    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

    String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration,
        base64EncodedSecretKey);

    return accessToken;
  }

  public String delegateRefreshToken(Member oAuth2User) {
    String subject = oAuth2User.getEmail();
    Date expiration = jwtTokenizer.getTokenExpiration(
        jwtTokenizer.getRefreshTokenExpirationMinutes());
    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

    String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration,
        base64EncodedSecretKey);

    return refreshToken;
  }
}