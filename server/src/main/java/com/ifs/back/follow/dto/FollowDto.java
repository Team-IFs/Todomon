package com.ifs.back.follow.dto;

import com.ifs.back.member.dto.MemberDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class FollowDto {

  @Getter
  @AllArgsConstructor
  @Builder
  public static class FollowResponse {

    private long followId;
    private MemberDto.MemberResponse follow;
  }

  public static class FollowPage extends PageImpl<FollowResponse> {

    public FollowPage(List<FollowResponse> content, Pageable pageable, long total) {
      super(content, pageable, total);
    }
  }
}
