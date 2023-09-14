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
    if(friend.getRequest().getMemberId() == friend.getReceived().getMemberId())
      throw new BusinessLogicException(FriendExceptionCode.FRIEND_NOT_ALLOWED);

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
  public void acceptFriend(long friendId, long memberId) {
    Friend friend = friendRepository.findById(friendId)
        .orElseThrow(() -> new BusinessLogicException(FriendExceptionCode.FRIEND_NOT_FOUND));
    if(friend.getReceived().getMemberId() == memberId) {
      friend.setAccepted(true);
      friendRepository.save(friend);
    }
  }

  @Transactional
  public void denyFriend(long friendId, long memberId) {
    Friend friend = friendRepository.findVerifiedFriendforDeny(memberId, friendId)
        .orElseThrow(() -> new BusinessLogicException(FriendExceptionCode.FRIEND_NOT_FOUND));
    friendRepository.deleteById(friend.getFriendId());
  }

  @Transactional
  public void deleteFriend(long friendId, long memberId) {
    Friend friend = friendRepository.findVerifiedFriendforDelete(memberId, friendId)
        .orElseThrow(() -> new BusinessLogicException(FriendExceptionCode.FRIEND_NOT_FOUND));
    friendRepository.deleteById(friend.getFriendId());
  }


  public Page<FriendDto.FriendResponse> findFriends(long memberId, Pageable pageable) {
    Page<Friend> friendPage = friendRepository.findAllFriend(memberId, pageable);
    return friendPage.map(friend -> friendToFriendResponse(friend, memberId));
  }

  public Page<FriendDto.FriendResponse> findRequests (long memberId, Pageable pageable) {
    Page<Friend> friendPage = friendRepository.findAllRequest(memberId, pageable);
    return friendPage.map(friend -> friendToFriendResponse(friend, memberId));
  }

  public Page<FriendDto.FriendResponse> findReceived (long memberId, Pageable pageable) {
    Page<Friend> friendPage = friendRepository.findAllReceived(memberId, pageable);
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
