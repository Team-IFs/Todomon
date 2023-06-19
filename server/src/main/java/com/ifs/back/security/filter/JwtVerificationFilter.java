package com.ifs.back.security.filter;

import com.ifs.back.security.jwt.JwtTokenizer;
import com.ifs.back.security.utils.AuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import java.io.IOException;
import io.jsonwebtoken.ExpiredJwtException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

  private final JwtTokenizer jwtTokenizer;
  private final AuthorityUtils authorityUtils;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    try {
      Map<String, Object> claims = verifyJws(request);
      setAuthenticationToContext(claims);
    } catch (SignatureException se) {
      request.setAttribute("exception", se);
    } catch (ExpiredJwtException ee) {
//      request.setAttribute("exception", ee);
        validateRefreshToken(request);
    } catch (Exception e) {

      request.setAttribute("exception", e);
    }
    filterChain.doFilter(request, response);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    String authorization = request.getHeader("Authorization");

    return authorization == null || !authorization.startsWith("Bearer");
  }

  private Map<String, Object> verifyJws(HttpServletRequest request) {
    String jws = request.getHeader("Authorization").replace("Bearer ", "");
    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
    Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

    return claims;
  }

  private void setAuthenticationToContext(Map<String, Object> claims) {
    String username = (String) claims.get("username");
    List<GrantedAuthority> authorities = authorityUtils.createAuthorities(
        (List) claims.get("roles"));
    Authentication authentication = new UsernamePasswordAuthenticationToken(username, null,
        authorities);
    SecurityContextHolder.getContext().setAuthentication(authentication);
  }

  public String validateRefreshToken(HttpServletRequest request) {

    // refresh 객체에서 refreshToken 추출
    String refreshToken = request.getHeader("Refresh");
    try {
      // 검증
      Jws<Claims> claims = Jwts.parser().setSigningKey(jwtTokenizer.getSecretKey())
          .parseClaimsJws(refreshToken);
      //refresh 토큰의 만료시간이 지나지 않았을 경우, 새로운 access 토큰을 생성.
      if (!claims.getBody().getExpiration().before(new Date())) {
        return recreationAccessToken(claims.getBody().get("sub").toString(), claims.getBody().get("roles"));
      }
    } catch (Exception e) {
      //refresh 토큰이 만료되었을 경우, 로그인이 필요.
      request.setAttribute("exception", e);
      return null;
    }
    return null;
  }
  public String recreationAccessToken(String email, Object roles){

    Map<String, Object> claims = new HashMap<>();
    claims.put("username", email);
    claims.put("roles", roles);
    Date expiration = new Date(new Date().getTime() + jwtTokenizer.getAccessTokenExpirationMinutes());
    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
    return jwtTokenizer.generateAccessToken(claims, email, expiration, base64EncodedSecretKey);
  }
}
