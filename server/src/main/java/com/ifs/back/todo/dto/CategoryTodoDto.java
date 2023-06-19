package com.ifs.back.todo.dto;

import com.ifs.back.todo.dto.TodoDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class CategoryTodoDto {
  private long categoryId;
  private String categoryName;
  private String categoryColor;
  private boolean isHide;
  private int scope;
  private List<TodoDto.Response> todos;
}
