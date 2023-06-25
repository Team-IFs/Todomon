package com.ifs.back.todo.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@Getter
@AllArgsConstructor
@Builder
public class CategoryTodoDto {
  private long categoryId;
  private String categoryName;
  private String categoryColor;
  private boolean isHide;
  private int scope;
  private List<TodoDto.TodoResponse> todos;

  public static class CategoryTodoPage extends PageImpl<CategoryTodoDto> {

    public CategoryTodoPage(List<CategoryTodoDto> content, Pageable pageable, long total) {
      super(content, pageable, total);
    }
  }
}
