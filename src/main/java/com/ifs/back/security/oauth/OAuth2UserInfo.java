package com.ifs.back.security.oauth;

import java.util.Map;

public interface OAuth2UserInfo {

  public abstract String getName();
  public abstract String getImageUrl();
  public abstract String getEmail();
}
