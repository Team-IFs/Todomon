package com.ifs.back.exception;

import com.ifs.back.exception.advice.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvice {

  @ExceptionHandler(BusinessLogicException.class)
  public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
    final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

//  return new ResponseEntity<>(HttpStatus.valueOf(e.getExceptionCode().getStatus())); // 기존 코드
    return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
  }
}