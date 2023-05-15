package com.ifs.back.friend.exception;

import com.ifs.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FriendExceptionCode implements ExceptionCode {

  FRIEND_NOT_FOUND(HttpStatus.NOT_FOUND, "친구 목록에 없습니다."),
  FRIEND_EXISTS(HttpStatus.CONFLICT, "이미 친구 목록에 존재합니다."),
  FRIEND_NOT_ALLOWED(HttpStatus.CONFLICT, "자신을 친구추가할 수 없습니다."),
  FRIEND_ALREADY_REQUEST(HttpStatus.CONFLICT, "이미 친구신청을 보냈습니다."),
  ;

  private final HttpStatus status;
  private final String message;
}
