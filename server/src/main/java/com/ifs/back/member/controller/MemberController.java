package com.ifs.back.member.controller;

import com.ifs.back.category.service.CategoryService;
import com.ifs.back.member.dto.MemberDto;
import com.ifs.back.member.entity.Member;
import com.ifs.back.member.mapper.MemberMapper;
import com.ifs.back.member.service.MemberService;
import com.ifs.back.todomon.dto.TodomonDto;
import com.ifs.back.todomon.entity.Todomon;
import com.ifs.back.util.UriCreator;
import com.ifs.back.util.Util;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.net.URI;
import java.security.Principal;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Member", description = "멤버 API")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Validated
@Slf4j
public class MemberController {

  private final static String MEMBER_DEFAULT_URL = "/users";
  private final MemberService memberService;
  private final MemberMapper mapper;
  private final CategoryService categoryService;

  @Operation(summary = "회원 가입", description = "회원가입할 때 기본 카테고리 생성")
  @PostMapping
  public ResponseEntity postMember(@Valid @RequestBody MemberDto.MemberPost requestBody) {
    log.info("## 회원 가입");
    Member member = mapper.memberPostToMember(requestBody);
    member.setTodomon(new Todomon());
    Member createdMember = memberService.createMember(member);

    categoryService.createBasicCategory(createdMember);

    URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

    return ResponseEntity.created(location).build();
  }

  @Operation(summary = "사용자 정보 수정")
  @PatchMapping("/me")
  public ResponseEntity patchMember(@Valid @RequestBody MemberDto.MemberPatch requestBody,
      Principal principal) {
    Member member = mapper.memberPatchToMember(requestBody);
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    member.setMemberId(currentId);
    log.info("## 사용자 정보 수정: {}", member.toString());
    Member updateMember = memberService.updateMember(member);
    return ResponseEntity.ok().body(mapper.memberToMemberResponse(updateMember));
  }

  @Operation(summary = "비밀번호 변경", description = "현재의 비밀번호와 일치해야 변경 가능")
  @PatchMapping("/me/password")
  public ResponseEntity patchPassword(@Valid @RequestBody MemberDto.MemberPassword requestBody,
      Principal principal) {
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    log.info("## 비밀번호 변경: {}");
    Member updateMember = memberService.updatePassword(currentId, requestBody);
    return ResponseEntity.ok().body(mapper.memberToMemberResponse(updateMember));
  }

  @Operation(summary = "투두몬 정보 수정", description = "변경하길 원하는 필드의 정보만 전송")
  @PatchMapping("/me/todomon")
  public ResponseEntity patchTodomon(@Valid @RequestBody TodomonDto.TodomonPatch requestBody,
      Principal principal) {
    Todomon todomon = mapper.todomonPatchToTodomon(requestBody);
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    log.info("## 투두몬 정보 수정: {}", todomon.toString());
    Member updateMember = memberService.updateTodomon(todomon, currentId);
    return ResponseEntity.ok().body(mapper.memberToMemberResponse(updateMember));
  }

  @Operation(summary = "내 정보 조회", responses = {
      @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = MemberDto.MemberResponse.class)))})
  @GetMapping("/me")
  public ResponseEntity getMemberBySelf(Principal principal) {
    log.info("## 내 정보 조회");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Member findMember = memberService.findMember(currentId);

    return ResponseEntity.ok().body(mapper.memberToMemberResponse(findMember));
  }

  @Operation(summary = "다른 유저 정보 조회", description = "{member_id}의 정보 조회", responses = {
      @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = MemberDto.MemberResponse.class)))})
  @GetMapping("/{member-id}")
  public ResponseEntity getMember(
      @PathVariable("member-id") @Positive long memberId) {
    Member findMember = memberService.findMember(memberId);
    log.info("## 사용자 정보 조회: {}", findMember.toString());

    return new ResponseEntity<>(mapper.memberToMemberResponse(findMember),
        HttpStatus.OK);
  }

  @Operation(summary = "사용자 탈퇴")
  @DeleteMapping("/me")
  public ResponseEntity deleteMember(Principal principal) {
    log.info("## 사용자 탈퇴: {}");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    memberService.deleteMember(currentId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @Operation(summary = "이메일 검색", responses = {
      @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = MemberDto.MemberPage.class)))})
  @GetMapping("/search")
  public ResponseEntity searchMembers(
      @RequestParam(value = "email", required = false, defaultValue = "") String email,
      @PageableDefault Pageable pageable) {
    log.info("## 이메일 검색: {}", email);

    Page<Member> memberPage = memberService
        .searchMembersByEmail(pageable, email);
    Page<MemberDto.MemberResponse> responsePage = mapper.memberPageToMemberResponseDtoPage(
        memberPage);
    return ResponseEntity.ok().body(responsePage);
  }

  @Operation(summary = "비밀번호 찾기", description = "소셜 로그인 회원은 사용 불가")
  @PostMapping("/search/password")
  public ResponseEntity searchPassword(
      @Valid @RequestBody MemberDto.MemberSearch requestBody) {
    log.info("## 비밀번호 찾기");
    memberService.searchPassword(requestBody);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
