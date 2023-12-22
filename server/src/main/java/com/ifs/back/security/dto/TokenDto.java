package com.ifs.back.security.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TokenDto {

  private String access_token;
  private String refresh_token;

}
