package com.ifs.back.member.service;

import com.ifs.back.exception.BusinessLogicException;
import com.ifs.back.member.entity.Member;
import com.ifs.back.member.exception.MemberExceptionCode;
import com.ifs.back.member.repository.MemberRepository;
import com.ifs.back.todomon.entity.Todomon;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
@Service
public class MemberService {

  private final MemberRepository memberRepository;
//  private final PasswordEncoder passwordEncoder;

  @Transactional
  public Member createMember(Member member) {
    verifyExistsEmail(member.getEmail());

//    String encryptedPassword = passwordEncoder.encode(member.getPassword());
//    member.setPassword(encryptedPassword);

    return memberRepository.save(member);
  }

  @Transactional
  public Member updateMember(Member member) {
    // Todo: token 도입 전 까진 내 아이디 1로 통일
    Member findMember = findVerifiedMember(1);
    Optional.ofNullable(member.getNickname())
        .ifPresent(findMember::setNickname);
    Optional.ofNullable(member.getBio())
        .ifPresent(findMember::setBio);
    Optional.ofNullable(member.getPhotoUrl())
        .ifPresent(findMember::setPhotoUrl);
    Member savedMember = memberRepository.save(findMember);
    log.info("## updated member: {}", savedMember);
    return savedMember;
  }

  @Transactional
  public Member updateTodomon(Todomon todomon) {
    // Todo: token 도입 전 까진 내 아이디 1로 통일
    Member findMember = findVerifiedMember(1);
    Optional.ofNullable(todomon.getFaceColor())
        .ifPresent(findMember.getTodomon()::setFaceColor);
    Optional.ofNullable(todomon.getRightEyeColor())
        .ifPresent(findMember.getTodomon()::setRightEyeColor);
    Optional.ofNullable(todomon.getLeftEyeColor())
        .ifPresent(findMember.getTodomon()::setLeftEyeColor);
    Optional.ofNullable(todomon.getBackgroundColor())
        .ifPresent(findMember.getTodomon()::setBackgroundColor);
    Member savedMember = memberRepository.save(findMember);
    log.info("## updated todomon: {}", savedMember.getTodomon());
    return savedMember;
  }

  public Member findMember(long memberId) {
    return findVerifiedMember(memberId);
  }

  public void deleteMember() {
    // Todo: token 도입 전 까진 내 아이디 1로 통일
    long memberId = 1;
    memberRepository.deleteById(memberId);
  }


  public void verifyExistsEmail(String email) {
    Optional<Member> member = memberRepository.findByEmail(email);
    if (member.isPresent()) {
      throw new BusinessLogicException(MemberExceptionCode.EMAIL_EXISTS);
    }
  }

  public Member findMemberByEmail(String email) {
    Optional<Member> optionalMember = memberRepository.findByEmail(email);

    Member findMember = optionalMember.orElseThrow(()
        -> new BusinessLogicException(MemberExceptionCode.MEMBER_NOT_FOUND));
    return findMember;
  }

  public Page<Member> searchMembersByEmail(Pageable pageable, String email) {
    Page<Member> memberPage = memberRepository.getMembersByEmail(email, pageable);
    return memberPage;

  }

  private Member findVerifiedMember(long memberId) {
    Optional<Member> optionalMember =
        memberRepository.findById(memberId);
    Member findMember =
        optionalMember.orElseThrow(() ->
            new BusinessLogicException(MemberExceptionCode.MEMBER_NOT_FOUND));

    return findMember;
  }
}
