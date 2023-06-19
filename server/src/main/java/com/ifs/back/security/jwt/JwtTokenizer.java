package com.ifs.back.security.jwt;

import com.ifs.back.member.entity.Member;
import com.ifs.back.security.oauth.AuthService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtTokenizer {

  @Getter
  @Value("${jwt.key.secret}")
  private String secretKey;

  @Getter
  @Value("${jwt.access-token-expiration-minutes}")
  private int accessTokenExpirationMinutes;

  @Getter
  @Value("${jwt.refresh-token-expiration-minutes}")
  private int refreshTokenExpirationMinutes;

  private final AuthService authService;

  public String encodeBase64SecretKey(String secretKey) {
    return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
  }

  public String generateAccessToken(Map<String, Object> claims,
      String subject,
      Date expiration,
      String base64EncodedSecretKey) {
    Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

    return Jwts.builder()
        .setClaims(claims)
        .setSubject(subject)
        .setIssuedAt(Calendar.getInstance().getTime())
        .setExpiration(expiration)
        .signWith(key)
        .compact();
  }

  public String generateRefreshToken(String subject, Date expiration,
      String base64EncodedSecretKey) {
    Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

    return Jwts.builder()
        .setSubject(subject)
        .setIssuedAt(Calendar.getInstance().getTime())
        .setExpiration(expiration)
        .signWith(key)
        .compact();
  }

  public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
    Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

    Jws<Claims> claims = Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(jws);
    return claims;
  }

  public void verifySignature(String jws, String base64EncodedSecretKey) {
    Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

    Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(jws);
  }

  // (5)
  public Date getTokenExpiration(int expirationMinutes) {
    Calendar calendar = Calendar.getInstance();
    calendar.add(Calendar.MINUTE, expirationMinutes);
    Date expiration = calendar.getTime();

    return expiration;
  }

  private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
    byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
    Key key = Keys.hmacShaKeyFor(keyBytes);

    return key;
  }

  public String delegateAccessToken(Member member) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("username", member.getEmail());
    claims.put("roles", member.getRoles());

    String subject = member.getEmail();
    Date expiration = getTokenExpiration(
        getAccessTokenExpirationMinutes());

    String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

    String accessToken = generateAccessToken(claims, subject, expiration,
        base64EncodedSecretKey);

    return accessToken;
  }

  private Claims extractAllClaims(String token) {
    Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(secretKey));

    return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token).getBody();
  }
  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }
  public Long getExpiration(String accessToken){
    Date expiration = extractClaim(accessToken, Claims::getExpiration);

    long now = new Date().getTime();
    return expiration.getTime() - now;
  }
  public String delegateRefreshToken(Member member) {
    String subject = member.getEmail();
    Date expiration = getTokenExpiration(
        getRefreshTokenExpirationMinutes());
    String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

    String refreshToken = generateRefreshToken(subject, expiration,
        base64EncodedSecretKey);

    Long refreshTokenExp = getExpiration(refreshToken);

    authService.redisSetRefreshToken(refreshTokenExp, refreshToken, subject);
    return refreshToken;
  }

}
