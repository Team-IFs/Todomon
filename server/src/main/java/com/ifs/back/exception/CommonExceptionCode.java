package com.ifs.back.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonExceptionCode implements ExceptionCode {
  TOKEN_NOT_REQUESTED(HttpStatus.UNAUTHORIZED.value(), "토큰이 없습니다."),
  INVALID_OAUTH(HttpStatus.BAD_REQUEST.value(), "유효하지 않은 경로입니다.")
  ;

  private final int status;
  private final String message;
}
