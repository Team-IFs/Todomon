package com.ifs.back.follow.exception;

import com.ifs.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FollowExceptionCode implements ExceptionCode {

  FOLLOW_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "구독 목록에 없습니다."),
  FOLLOW_EXISTS(HttpStatus.CONFLICT.value(), "이미 구독 목록에 존재합니다."),
  ;

  private final int status;
  private final String message;

}
