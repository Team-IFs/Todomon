package com.ifs.back.exception;

import org.springframework.http.HttpStatus;

public interface ExceptionCode {
  String getMessage();
  HttpStatus getStatus();
}
