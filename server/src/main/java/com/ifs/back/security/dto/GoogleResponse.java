package com.ifs.back.security.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ifs.back.member.entity.Member;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class GoogleResponse {

  @JsonProperty("sub")
  private String sub;

  @JsonProperty("name")
  private String name;

  @JsonProperty("given_name")
  private String given_name;

  @JsonProperty("family_name")
  private String family_name;

  @JsonProperty("picture")
  private String picture;

  @JsonProperty("email")
  private String email;

  @JsonProperty("email_verified")
  private String email_verified;

  @JsonProperty("locale")
  private String locale;

}