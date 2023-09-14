package com.ifs.back.security.oauth;

import java.util.Map;

public class KakaoOAuth2UserInfo implements OAuth2UserInfo {
  protected Map<String, Object> attributes;
  protected Map<String, Object> attributesAccount;
  protected Map<String, Object> attributesProfile;

  public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
    this.attributes = attributes;
    this.attributesAccount = (Map<String, Object>) attributes.get("kakao_account");
    this.attributesProfile = (Map<String, Object>) attributesAccount.get("profile");
  }

  public String getName() {
    return (String) attributesProfile.get("nickname");
  }

  public String getEmail() {
    return (String) attributesAccount.get("email");
  }
}
