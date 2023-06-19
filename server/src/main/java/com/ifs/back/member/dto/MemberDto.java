package com.ifs.back.member.dto;

import com.ifs.back.member.entity.Member;
import com.ifs.back.todomon.dto.TodomonDto;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MemberDto {
  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class Post {
    @NotNull(message = "공백 불가")
    private String email;
    @NotNull
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W)(?=.*[0-9]).{8,20}$", message = "최소 8자 이상 20자 이하 영문, 숫자, 특수문자혼용")
    private String password;
    @NotNull(message = "공백 불가")
    @Pattern(regexp = "^(?=.{1,10}$).*", message = "최대 10자")
    private String nickname;
    @Pattern(regexp = "^(?=.{1,20}$).*", message = "최대 20자")
    private String bio;
  }

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class Patch {
    private String nickname;
    private String bio;
  }

  @Getter
  @AllArgsConstructor
  @Builder
  public static class Response {
    private long memberId;
    private String nickname;
    private String bio;
    private Member.MemberStatus memberStatus;
    private boolean premium;
    private TodomonDto.Response todomon;

  }
}
