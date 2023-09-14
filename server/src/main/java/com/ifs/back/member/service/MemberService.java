package com.ifs.back.member.service;

import com.ifs.back.exception.BusinessLogicException;
import com.ifs.back.member.dto.MemberDto;
import com.ifs.back.member.entity.Member;
import com.ifs.back.member.exception.MemberExceptionCode;
import com.ifs.back.member.repository.MemberRepository;
import com.ifs.back.security.utils.AuthorityUtils;
import com.ifs.back.todomon.entity.Todomon;
import com.ifs.back.member.dto.MailDto;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
@Service
public class MemberService {

  @Value("${spring.mail.username}")
  private String username;

  private final MemberRepository memberRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthorityUtils authorityUtils;
  private final JavaMailSender mailSender;

  @Transactional
  public Member createMember(Member member) {
    verifyExistsEmail(member.getEmail());

    String encryptedPassword = passwordEncoder.encode(member.getPassword());
    member.setPassword(encryptedPassword);

    List<String> roles = authorityUtils.createRoles(member.getEmail());
    member.setRoles(roles);

    return memberRepository.save(member);
  }

  @Transactional
  public Member updateMember(Member member) {
    Member findMember = findVerifiedMember(member.getMemberId());
    Optional.ofNullable(member.getNickname())
        .ifPresent(findMember::setNickname);
    Optional.ofNullable(member.getBio())
        .ifPresent(findMember::setBio);
    Member savedMember = memberRepository.save(findMember);
    log.info("## updated member: {}", savedMember);
    return savedMember;
  }

  @Transactional
  public Member updateTodomon(Todomon todomon, long currentId) {
    Member findMember = findVerifiedMember(currentId);
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

  @Transactional
  public Member updatePassword(long currentId, MemberDto.MemberPassword requestBody) {
    Member findMember = findVerifiedMember(currentId);

    if (!findMember.getPassword().startsWith("{")) {
      throw new BusinessLogicException(MemberExceptionCode.SOCIAL_LOGIN_USER);
    }
    else if (passwordEncoder.matches(requestBody.getCurrentPassword(), findMember.getPassword())) {
      findMember.setPassword(passwordEncoder.encode(requestBody.getNewPassword()));
    } else {
      throw new BusinessLogicException(MemberExceptionCode.PASSWORD_NOT_MATCH);
    }
    Member savedMember = memberRepository.save(findMember);
    log.info("## updated password: {}", savedMember);
    return savedMember;
  }

  @Transactional
  public void searchPassword(MemberDto.MemberSearch requestBody) {
    Member findMember = findMemberByEmail(requestBody.getEmail());
    if (!findMember.getPassword().startsWith("{")) {
      throw new BusinessLogicException(MemberExceptionCode.SOCIAL_LOGIN_USER);
    }

    String ranPw = RandomStringUtils.randomAlphanumeric(10) + "!";
    findMember.setPassword(passwordEncoder.encode(ranPw));
    memberRepository.save(findMember);

    MailDto dto = createMailAndChangePassword(findMember.getEmail(), findMember.getNickname(), ranPw);
    mailSend(dto);

  }

  public Member findMember(long memberId) {
    return findVerifiedMember(memberId);
  }

  @Transactional
  public void deleteMember(long memberId) {
    memberRepository.deleteById(memberId);
  }


  public void verifyExistsEmail(String email) {
    Optional<Member> member = memberRepository.findByEmail(email);
    if (member.isPresent()) {
      throw new BusinessLogicException(MemberExceptionCode.EMAIL_EXISTS);
    }
  }

  public Long findMemberIdByEmail(String email) {
    return memberRepository.findMemberIdByEmail(email)
        .orElseThrow(() -> new BusinessLogicException(MemberExceptionCode.MEMBER_NOT_FOUND));
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

  public Member findMemberByEmail(String email) {
    Optional<Member> optionalMember =
        memberRepository.findByEmail(email);
    Member findMember =
        optionalMember.orElseThrow(() ->
            new BusinessLogicException(MemberExceptionCode.MEMBER_NOT_FOUND));

    return findMember;
  }

  public MailDto createMailAndChangePassword(String userEmail, String userName, String str){
    MailDto dto = new MailDto();
    dto.setAddress(userEmail);
    dto.setTitle(userName+"님의 Todomon 임시비밀번호 안내 이메일 입니다.");
    dto.setMessage("안녕하세요. Todomon 임시비밀번호 안내 관련 이메일 입니다." + "[" + userName + "]" +"님의 임시 비밀번호는 "
        + str + " 입니다.");
    return dto;
  }

  public void mailSend(MailDto mailDto) {
    System.out.println("전송 완료!");
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(mailDto.getAddress());
    message.setFrom(username);
    message.setSubject(mailDto.getTitle());
    message.setText(mailDto.getMessage());

    mailSender.send(message);
  }

}
