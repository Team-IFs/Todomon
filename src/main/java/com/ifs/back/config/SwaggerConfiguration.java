package com.ifs.back.config;

import java.util.ArrayList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

  @Bean
  public Docket apiV1() {
    return new Docket(DocumentationType.SWAGGER_2)
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
}
