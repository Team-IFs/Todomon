package com.ifs.back.security.oauth;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@EnableAsync
@RequiredArgsConstructor
public class RedisService {

  private final RedisTemplate<String, String> redisTemplate;
  @Async
  public void redisSetRefreshToken(Long refreshTokenExp,String refreshToken,String subject) {
    redisTemplate.opsForValue().set(subject, refreshToken, refreshTokenExp, TimeUnit.MILLISECONDS);
  }
}
