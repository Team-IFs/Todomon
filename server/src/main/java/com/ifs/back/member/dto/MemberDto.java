package com.ifs.back.member.dto;

import com.ifs.back.member.entity.Member;
import com.ifs.back.todomon.dto.TodomonDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;


public class MemberDto {

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class MemberPost {

    @Email
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
  public static class MemberPatch {

    private String nickname;
    private String bio;
  }

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class MemberSearch {

    private String email;
  }

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class MemberPassword {

    @NotNull
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W)(?=.*[0-9]).{8,20}$", message = "최소 8자 이상 20자 이하 영문, 숫자, 특수문자혼용")
    private String currentPassword;
    @NotNull
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W)(?=.*[0-9]).{8,20}$", message = "최소 8자 이상 20자 이하 영문, 숫자, 특수문자혼용")
    private String newPassword;
  }

  @Getter
  @AllArgsConstructor
  @Builder
  public static class MemberResponse {

    private long memberId;
    private String nickname;
    private String email;
    private String bio;
    private Member.MemberStatus memberStatus;
    private boolean premium;
    private TodomonDto.TodomonResponse todomon;

  }

  public static class MemberPage extends PageImpl<MemberResponse> {

    public MemberPage(List<MemberResponse> content, Pageable pageable, long total) {
      super(content, pageable, total);
    }
  }
}
