package com.ifs.back.category.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CategoryDto {

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class Post {
    @NotNull(message = "카테고리 이름을 비울 수 없습니다.")
    private String categoryName;
    @NotNull(message = "카테고리 색상을 비울 수 없습니다.")
    private String categoryColor;
    @NotNull(message = "공개범위를 비울 수 없습니다.")
    @Min(0)
    @Max(2)
    private int scope;
    @NotNull(message = "숨기기 여부를 비울 수 없습니다.")
    private boolean isHide;
  }

  @Getter
  @AllArgsConstructor
  @Builder
  public static class Patch {
    private String categoryName;
    private String categoryColor;
    private boolean isHide;
    @Pattern(regexp = "^(?=.*[0-2]).{1}$", message = "0 = 전체 공개 / 1 = 친구 공개 / 2 = 비공개")
    private int scope;
  }

  @Getter
  @AllArgsConstructor
  @Builder
  public static class Response {
    private long categoryId;
    private String categoryName;
    private String categoryColor;
    private boolean isHide;
    @Pattern(regexp = "^(?=.*[0-2]).{1}$", message = "0 = 전체 공개 / 1 = 친구 공개 / 2 = 비공개")
    private int scope;
  }
}
