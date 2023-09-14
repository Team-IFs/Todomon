package com.ifs.back.security.oauth;

import java.util.Map;

public class GoogleOAuth2UserInfo implements OAuth2UserInfo{

  protected Map<String, Object> attributes;

  public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
    this.attributes = attributes;
  }

  public String getName() {
    return (String) attributes.get("name");
  }

  public String getEmail() {
    return (String) attributes.get("email");
  }

}