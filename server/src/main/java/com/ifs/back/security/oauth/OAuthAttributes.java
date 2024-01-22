package com.ifs.back.security.oauth;

import com.ifs.back.exception.BusinessLogicException;
import com.ifs.back.exception.CommonExceptionCode;
import com.ifs.back.member.entity.Member;
import com.ifs.back.todomon.entity.Todomon;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 각 소셜에서 받아오는 데이터가 다르므로
 * 소셜별로 데이터를 받는 데이터를 분기 처리하는 DTO 클래스
 */
@Getter
public class OAuthAttributes {

  private String nameAttributeKey; // OAuth2 로그인 진행 시 키가 되는 필드 값, PK와 같은 의미
  private OAuth2UserInfo oAuth2UserInfo; // 소셜 타입별 로그인 유저 정보(닉네임, 이메일, 프로필 사진 등등)

  @Builder
  public OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo,
      PasswordEncoder passwordEncoder) {
    this.nameAttributeKey = nameAttributeKey;
    this.oAuth2UserInfo = oauth2UserInfo;
  }

  public static OAuthAttributes of(String userNameAttributeName, Map<String, Object> attributes, String registrationId) {
    if("naver".equals(registrationId)) {
      return ofNaver(userNameAttributeName, attributes);
    }
    else if("kakao".equals(registrationId)){
      return ofKakao(userNameAttributeName, attributes);
    }
    else throw new BusinessLogicException(CommonExceptionCode.INVALID_OAUTH);
  }

  private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
    return OAuthAttributes.builder()
        .nameAttributeKey(userNameAttributeName)
        .oauth2UserInfo(new NaverOAuth2UserInfo((Map) attributes.get("response")))
        .build();
  }

  private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
    return OAuthAttributes.builder()
        .nameAttributeKey(userNameAttributeName)
        .oauth2UserInfo(new KakaoOAuth2UserInfo(attributes))
        .build();
  }
  /**
   * of메소드로 OAuthAttributes 객체가 생성되어, 유저 정보들이 담긴 OAuth2UserInfo가 소셜 타입별로 주입된 상태
   * OAuth2UserInfo에서 socialId(식별값), nickname, imageUrl을 가져와서 build
   * email에는 UUID로 중복 없는 랜덤 값 생성
   * role은 GUEST로 설정
   * 비밀번호는 임의로 작성
   */
  public Member toEntity(OAuth2UserInfo oauth2UserInfo) {
    return Member.builder()
        .email(oauth2UserInfo.getEmail())
        .nickname(oauth2UserInfo.getName())
        .password(new BCryptPasswordEncoder().encode(UUID.randomUUID().toString().substring(0, 6)))
        .roles(List.of("USER"))
        .todomon(new Todomon())
        .build();
  }
}