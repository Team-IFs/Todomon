package com.ifs.back.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifs.back.member.entity.Member;
import com.ifs.back.security.dto.LoginDto;
import com.ifs.back.security.jwt.JwtTokenizer;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;
  private final JwtTokenizer jwtTokenizer;

  @SneakyThrows
  @Override
  public Authentication attemptAuthentication(HttpServletRequest request,
      HttpServletResponse response) {

    ObjectMapper objectMapper = new ObjectMapper();
    LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

    UsernamePasswordAuthenticationToken authenticationToken =
        new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

    return authenticationManager.authenticate(authenticationToken);
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain chain,
      Authentication authResult) throws ServletException, IOException {
    Member member = (Member) authResult.getPrincipal();

    String accessToken = jwtTokenizer.delegateAccessToken(member);
    String refreshToken = jwtTokenizer.delegateRefreshToken(member);

    response.setHeader("Authorization", "Bearer " + accessToken);
    response.setHeader("Refresh", refreshToken);
    response.addHeader("Access-Control-Expose-Headers", "Authorization, Refresh");

    this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
  }


}