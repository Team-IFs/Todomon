package com.ifs.back.security.oauth;

import java.util.Map;

public class NaverOAuth2UserInfo implements OAuth2UserInfo{

  protected Map<String, Object> attributes;

  public NaverOAuth2UserInfo(Map<String, Object> attributes) {
    this.attributes = attributes;
  }

  public String getName() {
    return (String) attributes.get("nickname");
  }

  public String getEmail() {
    return (String) attributes.get("email");
  }

}
