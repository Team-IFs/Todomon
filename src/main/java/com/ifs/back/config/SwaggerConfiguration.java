package com.ifs.back.config;

import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

  @Bean
  public Docket apiV1() {
    return new Docket(DocumentationType.SWAGGER_2)
        .securityContexts(List.of(this.securityContext())) // SecurityContext 설정
        .securitySchemes(List.of(this.apiKey())) // ApiKey 설정
        .groupName("Member")
        .select()
        .apis(RequestHandlerSelectors.
            basePackage("com.ifs.back.member"))
        .paths(PathSelectors.ant("/users/**"))
        .build()
        .apiInfo(apiInfo());
  }

  @Bean
  public Docket apiV2() {
    return new Docket(DocumentationType.SWAGGER_2)
        .useDefaultResponseMessages(false)
        .securityContexts(List.of(this.securityContext()))
        .securitySchemes(List.of(this.apiKey()))
        .groupName("Todo")
        .select()
        .apis(RequestHandlerSelectors.
            basePackage("com.ifs.back.todo"))
        .paths(PathSelectors.ant("/users/me/todos/**"))
        .build()
        .apiInfo(apiInfo());
  }

  @Bean
  public Docket apiV3() {
    return new Docket(DocumentationType.SWAGGER_2)
        .useDefaultResponseMessages(false)
        .securityContexts(List.of(this.securityContext()))
        .securitySchemes(List.of(this.apiKey()))
        .groupName("Category")
        .select()
        .apis(RequestHandlerSelectors.
            basePackage("com.ifs.back.category"))
        .paths(PathSelectors.ant("/users/me/categories/**"))
        .build()
        .apiInfo(apiInfo());
  }

  @Bean
  public Docket apiV4() {
    return new Docket(DocumentationType.SWAGGER_2)
        .useDefaultResponseMessages(false)
        .securityContexts(List.of(this.securityContext()))
        .securitySchemes(List.of(this.apiKey()))
        .groupName("Friend")
        .select()
        .apis(RequestHandlerSelectors.
            basePackage("com.ifs.back.friend"))
        .paths(PathSelectors.ant("/users/me/friends/**"))
        .build()
        .apiInfo(apiInfo());
  }

  @Bean
  public Docket apiV5() {
    return new Docket(DocumentationType.SWAGGER_2)
        .useDefaultResponseMessages(false)
        .securityContexts(List.of(this.securityContext()))
        .securitySchemes(List.of(this.apiKey()))
        .groupName("Follow")
        .select()
        .apis(RequestHandlerSelectors.
            basePackage("com.ifs.back.follow"))
        .paths(PathSelectors.ant("/users/me/follows/**"))
        .build()
        .apiInfo(apiInfo());
  }

  private ApiInfo apiInfo() {
    return new ApiInfo(
        "Title",
        "Description",
        "version 1.0",
        "https://naver.com",
        new Contact("Contact Me", "https://daum.net", "colt@colt.com"),
        "Edit Licenses",
        "https://naver.com",
        new ArrayList<>()
    );
  }

  // JWT SecurityContext 구성
  private SecurityContext securityContext() {
    return SecurityContext.builder()
        .securityReferences(defaultAuth())
        .build();
  }

  private List<SecurityReference> defaultAuth() {
    AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
    AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
    authorizationScopes[0] = authorizationScope;
    return List.of(new SecurityReference("Authorization", authorizationScopes));
  }

  // ApiKey 정의
  private ApiKey apiKey() {
    return new ApiKey("Authorization", "Authorization", "header");
  }
}
