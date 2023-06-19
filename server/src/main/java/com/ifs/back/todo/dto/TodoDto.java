package com.ifs.back.todo.dto;

import com.ifs.back.category.entity.Category;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class TodoDto {

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class Post {
    @NotNull(message = "이름을 비울 수 없습니다.")
    private String todoName;
  }

  @Getter
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class Patch {
    private String todoName;
    private LocalDate startAt;
    private LocalDate endAt;
    private String repeated;
  }

  @Getter
  @AllArgsConstructor
  @Builder
  public static class Response {
    private long todoId;
    private long categoryId;
    private String todoName;
    private LocalDate startAt;
    private LocalDate endAt;
    private boolean isDone;
    private String repeated;
  }

}
