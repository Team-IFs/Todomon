package com.ifs.back.todomon.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class TodomonDto {

  @Getter
  @AllArgsConstructor
  @Builder
  public static class TodomonPatch {
    @Schema(defaultValue = "#000000")
    private String faceColor;
    @Schema(defaultValue = "#000000")
    private String rightEyeColor;
    @Schema(defaultValue = "#000000")
    private String leftEyeColor;
    @Schema(defaultValue = "#000000")
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
