package com.ifs.back.friend.controller;

import com.ifs.back.friend.dto.FriendDto;
import com.ifs.back.friend.entity.Friend;
import com.ifs.back.friend.service.FriendService;
import com.ifs.back.member.entity.Member;
import com.ifs.back.member.service.MemberService;
import com.ifs.back.util.UriCreator;
import com.ifs.back.util.Util;
import io.swagger.annotations.ApiOperation;
import java.net.URI;
import java.security.Principal;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/me/friends")
@RequiredArgsConstructor
@Validated
@Slf4j
public class FriendController {

  private final FriendService friendService;
  private final MemberService memberService;

  @ApiOperation(value = "친구 요청")
  @PostMapping("/request/{member_id}")
  public ResponseEntity postFriend(@PathVariable("friend_id") @Positive long memberId,
      Principal principal) {
    log.info("## 친구 요청");
    Member request = memberService.findMemberByEmail(Util.checkPrincipal(principal));
    Member received = memberService.findMember(memberId);

    Friend friend = new Friend();
    friend.setRequest(request);
    friend.setReceived(received);

    Friend createdFriend = friendService.createFriend(friend);
    URI uri = UriCreator.createUri("/users/me/friends", createdFriend.getFriendId());
    return ResponseEntity.created(uri).build();
  }

  @ApiOperation(value = "친구 요청 수락")
  @PatchMapping("/{friend_id}/accept")
  public ResponseEntity acceptFriend(@PathVariable("friend_id") @Positive long friendId) {
    log.info("## 친구 요청 수락");
    friendService.acceptFriend(friendId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @ApiOperation(value = "친구 요청 거절")
  @DeleteMapping("/{friend_id}/deny")
  public ResponseEntity denyFriend(@PathVariable("friend_id") @Positive long friendId) {
    log.info("## 친구 요청 거절");
    friendService.denyFriend(friendId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @ApiOperation(value = "친구 조회")
  @GetMapping
  public ResponseEntity getFriend(@PageableDefault Pageable pageable, Principal principal) {
    log.info("## 친구 조회");
    long memberId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Page<FriendDto.Response> responses = friendService.findFriends(memberId, pageable);
    return ResponseEntity.ok().body(responses);
  }

  @ApiOperation(value = "친구 요청 조회")
  @GetMapping("/request")
  public ResponseEntity getRequest(@PageableDefault Pageable pageable, Principal principal) {
    log.info("## 친구 요청 조회");
    long memberId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Page<FriendDto.Response> responses = friendService.findRequests(memberId, pageable);
    return ResponseEntity.ok().body(responses);
  }

  @ApiOperation(value = "친구 삭제")
  @DeleteMapping("/{friend_id}")
  public ResponseEntity deleteFriend(@PathVariable("friend_id") @Positive long friendId) {
    // 친구 요청 삭제랑 로직이 같은데 차이점을 만들어야하나 그냥 갈까?
    log.info("## 친구 삭제");
    friendService.denyFriend(friendId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
