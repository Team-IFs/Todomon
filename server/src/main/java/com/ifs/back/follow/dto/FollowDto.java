package com.ifs.back.follow.dto;

import com.ifs.back.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class FollowDto {
  @Getter
  @AllArgsConstructor
  @Builder
  public static class Response {
    private long followId;
    private MemberDto.Response follow;
  }
}
