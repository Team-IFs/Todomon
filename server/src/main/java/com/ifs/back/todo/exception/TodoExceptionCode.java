package com.ifs.back.todo.exception;

import com.ifs.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TodoExceptionCode implements ExceptionCode {
  TODO_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "할 일을 찾을 수 없습니다."),
  TODO_NOT_ALLOWED(HttpStatus.FORBIDDEN.value(), "유효하지 않은 할 일 입니다.")
  ;

  private final int status;
  private final String message;

}
