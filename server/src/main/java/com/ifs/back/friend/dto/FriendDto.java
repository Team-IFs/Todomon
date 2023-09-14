package com.ifs.back.friend.dto;

import com.ifs.back.follow.dto.FollowDto.FollowResponse;
import com.ifs.back.member.dto.MemberDto;
import java.util.List;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class FriendDto {

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class FriendResponse {

    private long friendId;
    private MemberDto.MemberResponse friend;
    private boolean accepted;
  }

  public static class FriendPage extends PageImpl<FriendResponse> {

    public FriendPage(List<FriendResponse> content, Pageable pageable, long total) {
      super(content, pageable, total);
    }
  }

}
