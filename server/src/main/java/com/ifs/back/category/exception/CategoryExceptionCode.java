package com.ifs.back.category.exception;

import com.ifs.back.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CategoryExceptionCode implements ExceptionCode {
  CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "카테고리를 찾을 수 없습니다."),
  CATEGORY_NOT_ALLOWED(HttpStatus.FORBIDDEN, "유효한 카테고리가 아닙니다."),
  ;

  private final HttpStatus status;
  private final String message;

}
