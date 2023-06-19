package com.ifs.back.follow.service;

import com.ifs.back.exception.BusinessLogicException;
import com.ifs.back.follow.dto.FollowDto;
import com.ifs.back.follow.entity.Follow;
import com.ifs.back.follow.exception.FollowExceptionCode;
import com.ifs.back.follow.mapper.FollowMapper;
import com.ifs.back.follow.repository.FollowRepository;
import com.ifs.back.friend.dto.FriendDto;
import com.ifs.back.friend.dto.FriendDto.Response;
import com.ifs.back.friend.entity.Friend;
import com.ifs.back.friend.exception.FriendExceptionCode;
import com.ifs.back.friend.repository.FriendRepository;
import com.ifs.back.member.mapper.MemberMapper;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FollowService {

  private final FollowRepository followRepository;
  private final MemberMapper memberMapper;

  @Transactional
  public Follow createFollow(Follow follow) {
    followRepository.findFollowByUsers(follow.getFollower().getMemberId(),
        follow.getFollowing().getMemberId()).ifPresent(f -> {
      throw new BusinessLogicException(FollowExceptionCode.FOLLOW_EXISTS);
    });
    return followRepository.save(follow);
  }

  public Page<FollowDto.Response> findFollowing(long memberId, Pageable pageable) {
    Page<Follow> followPage = followRepository.findAllFollowingsByMemberId(memberId, pageable);
    return followPage.map(follow -> followToFollowResponse(follow, memberId));
  }

  public Page<FollowDto.Response> findFollower(long memberId, Pageable pageable) {
    Page<Follow> followPage = followRepository.findAllFollowersByMemberId(memberId, pageable);
    return followPage.map(follow -> followToFollowResponse(follow, memberId));
  }
  public void deleteFollow(long followId, long memberId) {
    Optional<Follow> optionalFollow = followRepository.findById(followId);
    Follow findFollow = optionalFollow.orElseThrow(() -> new BusinessLogicException(FollowExceptionCode.FOLLOW_NOT_FOUND));
    if(findFollow.getFollower().getMemberId() != memberId) throw new BusinessLogicException(FollowExceptionCode.FOLLOW_NOT_FOUND);
    followRepository.deleteById(followId);
  }

  private FollowDto.Response followToFollowResponse(Follow follow, long memberId) {
    FollowDto.Response response = FollowDto.Response
        .builder()
        .followId(follow.getFollowId())
        .follow(
            memberMapper.memberToMemberResponse(follow.getFollowing())
        ).build();
    return response;
  }
}
