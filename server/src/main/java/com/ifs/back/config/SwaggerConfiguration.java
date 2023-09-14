package com.ifs.back.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@Configuration
public class SwaggerConfiguration {
  @Bean
  public OpenAPI openAPI(
      @Value("${springdoc.version}") String version
  ) {

    Info info = new Info()
        .title("Todomon API 문서") // 타이틀
        .version(version) // 문서 버전
        .description("잘못된 부분이나 오류 발생 시 바로 말씀해주세요.") // 문서 설명
        .contact(new Contact() // 연락처
            .email("aas9919@gmail.com"));

    SecurityScheme bearerAuth = new SecurityScheme()
        .type(SecurityScheme.Type.HTTP)
        .scheme("Bearer")
        .bearerFormat("Authorization")
        .in(SecurityScheme.In.HEADER)
        .name(HttpHeaders.AUTHORIZATION);

// Security 요청 설정
    SecurityRequirement addSecurityItem = new SecurityRequirement();
    addSecurityItem.addList("Authorization");

    return new OpenAPI()
        // Security 인증 컴포넌트 설정
        .components(new Components().addSecuritySchemes("Authorization", bearerAuth))
        // API 마다 Security 인증 컴포넌트 설정
        .addSecurityItem(addSecurityItem)
        .info(info);
  }
}
