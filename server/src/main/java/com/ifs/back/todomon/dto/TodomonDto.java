package com.ifs.back.todomon.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class TodomonDto {

  @Getter
  @AllArgsConstructor
  @Builder
  public static class TodomonPatch {

    private String faceColor;
    private String rightEyeColor;
    private String leftEyeColor;
    private String backgroundColor;
  }

  @Getter
  @AllArgsConstructor
  @Builder
  public static class TodomonResponse {

    private String faceColor;
    private String rightEyeColor;
    private String leftEyeColor;
    private String backgroundColor;
  }

}
