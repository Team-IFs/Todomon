package com.ifs.back.util;

import com.ifs.back.exception.BusinessLogicException;
import com.ifs.back.exception.CommonExceptionCode;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@Slf4j
public class Util {

  public static String checkPrincipal(Principal principal) {
    if (principal == null) {
      log.info("## 토큰 들어오지 않음.");
      throw new BusinessLogicException(CommonExceptionCode.TOKEN_NOT_REQUESTED);
    }
    log.info("## 토큰 들어옴: {}", principal.getName());
    return principal.getName();
  }
}
