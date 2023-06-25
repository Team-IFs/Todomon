package com.ifs.back.friend.service;

import com.ifs.back.exception.BusinessLogicException;
import com.ifs.back.friend.dto.FriendDto;
import com.ifs.back.friend.entity.Friend;
import com.ifs.back.friend.exception.FriendExceptionCode;
import com.ifs.back.friend.repository.FriendRepository;
import com.ifs.back.member.entity.Member;
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
public class FriendService {

  private final FriendRepository friendRepository;
  private final MemberMapper memberMapper;

  @Transactional
  public Friend createFriend(Friend friend) {
    friendRepository.findAcceptedByUsers(friend.getRequest().getMemberId(),
        friend.getReceived().getMemberId()).ifPresent(f -> {
      if (f) {
        throw new BusinessLogicException(FriendExceptionCode.FRIEND_ALREADY_REQUEST);
      } else {
        throw new BusinessLogicException(FriendExceptionCode.FRIEND_EXISTS);
      }
    });
    return friendRepository.save(friend);
  }

  @Transactional
  public void acceptFriend(long friendId) {
    Friend friend = friendRepository.findById(friendId)
        .orElseThrow(() -> new BusinessLogicException(FriendExceptionCode.FRIEND_NOT_FOUND));
    friend.setAccepted(true);
    friendRepository.save(friend);
  }

  @Transactional
  public void denyFriend(long friendId) {
    friendRepository.deleteById(friendId);
  }

  public Page<FriendDto.FriendResponse> findFriends(long memberId, Pageable pageable) {
    Page<Friend> friendPage = friendRepository.findAllFriend(memberId, pageable);
    return friendPage.map(friend -> friendToFriendResponse(friend, memberId));
  }

  public Page<FriendDto.FriendResponse> findRequests (long memberId, Pageable pageable) {
    Page<Friend> friendPage = friendRepository.findAllRequest(memberId, pageable);
    return friendPage.map(friend -> friendToFriendResponse(friend, memberId));
  }

  public Optional<Friend> findFriendByUsers (long memberId, long targetId){
    return friendRepository.findByUsers(memberId, targetId);
  }

  private FriendDto.FriendResponse friendToFriendResponse(Friend friend, long memberId) {
    FriendDto.FriendResponse response = FriendDto.FriendResponse
        .builder()
        .friendId(friend.getFriendId())
        .friend(
            friend.getRequest().getMemberId() == memberId ?
                memberMapper.memberToMemberResponse(friend.getReceived())
                : memberMapper.memberToMemberResponse(friend.getRequest())
        )
        .accepted(friend.isAccepted()).build();
    return response;
  }


}
