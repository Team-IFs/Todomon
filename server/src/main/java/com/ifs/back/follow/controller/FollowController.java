package com.ifs.back.follow.controller;

import com.ifs.back.follow.dto.FollowDto;
import com.ifs.back.follow.entity.Follow;
import com.ifs.back.follow.service.FollowService;
import com.ifs.back.member.entity.Member;
import com.ifs.back.member.service.MemberService;
import com.ifs.back.util.UriCreator;
import com.ifs.back.util.Util;
import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/me/follows")
@RequiredArgsConstructor
@Validated
@Slf4j
public class FollowController {

  private final FollowService followService;
  private final MemberService memberService;

  @Operation(summary = "구독 신청")
  @PostMapping("/{member_id}")
  public ResponseEntity postFriend(@PathVariable("member_id") @Positive long memberId, Principal principal) {
    log.info("##구독 신청");
    Member follower = memberService.findMemberByEmail(Util.checkPrincipal(principal));
    Member following = memberService.findMember(memberId);

    Follow follow = new Follow();
    follow.setFollower( follower);
    follow.setFollowing(following);

    Follow createdFollow = followService.createFollow(follow);
    URI uri = UriCreator.createUri("/users/me/follows", createdFollow.getFollowId());
    return ResponseEntity.created(uri).build();
  }

  @Operation(summary = "내가 구독한 목록 조회")
  @GetMapping("/following")
  public ResponseEntity getFollowing(@PageableDefault Pageable pageable, Principal principal) {
    log.info("## 내가 구독한 목록 조회");
    long memberId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Page<FollowDto.Response> responses = followService.findFollowing(memberId, pageable);
    return ResponseEntity.ok().body(responses);
  }

  @Operation(summary = "내가 구독된 목록 조회")
  @GetMapping("/follower")
  public ResponseEntity getFollower(@PageableDefault Pageable pageable, Principal principal) {
    log.info("## 내가 구독된 목록 조회");
    long memberId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Page<FollowDto.Response> responses = followService.findFollower(memberId, pageable);
    return ResponseEntity.ok().body(responses);
  }
  @Operation(summary = "구독 취소")
  @DeleteMapping("/{follow_id}")
  public ResponseEntity deleteFriend(@PathVariable("follow_id") @Positive long followId, Principal principal) {
    log.info("## 구독 취소");
    long memberId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    followService.deleteFollow(followId, memberId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}

