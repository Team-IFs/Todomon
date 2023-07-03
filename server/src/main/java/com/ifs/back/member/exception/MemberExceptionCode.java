package com.ifs.back.member.exception;

import com.ifs.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberExceptionCode implements ExceptionCode {


  MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "회원을 찾을 수 없습니다."),
  MEMBER_NOT_ALLOWED(HttpStatus.FORBIDDEN.value(), "권한이 없습니다."),
  EMAIL_EXISTS(HttpStatus.CONFLICT.value(), "이미 존재하는 이메일입니다."),
  PASSWORD_NOT_MATCH(HttpStatus.FORBIDDEN.value(), "비밀번호가 일치하지 않습니다.");

  private final int status;
  private final String message;
}
