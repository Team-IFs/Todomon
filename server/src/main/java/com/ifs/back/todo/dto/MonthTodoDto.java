package com.ifs.back.todo.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class MonthTodoDto {
  private int month;
  private int day;
  private List<CategoryTodoDto> categoryTodos;
}
