package com.ifs.back.security.oauth;

import com.ifs.back.member.entity.Member;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/social")
@RequiredArgsConstructor
@Validated
@Slf4j
public class AuthController {

  private final AuthService authService;

  @GetMapping("/google")
  public void socialLoginGoogle(@RequestParam String access_token, HttpServletResponse response)
      throws IOException {

    Member member = authService.getMemberByToken(access_token);

    String accessToken = authService.delegateAccessToken(member);
    String refreshToken = authService.delegateRefreshToken(member);

    MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
    queryParams.add("access_token", accessToken);
    queryParams.add("refresh_token", refreshToken);

    response.sendRedirect(UriComponentsBuilder.newInstance()
        .scheme("https")
        .host("todo-mon.netlify.app")
        .path("/login")
        .queryParams(queryParams).build().toUri().toString());
  }
}
