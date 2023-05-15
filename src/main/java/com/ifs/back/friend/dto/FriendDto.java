package com.ifs.back.friend.dto;

import com.ifs.back.member.dto.MemberDto;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class FriendDto {
  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class Response {
    private long friendId;
    private MemberDto.Response friend;
    private boolean accepted;
  }

}
