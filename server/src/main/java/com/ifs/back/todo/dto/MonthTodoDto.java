package com.ifs.back.todo.dto;

import java.util.List;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@Getter
@AllArgsConstructor
@Builder
public class MonthTodoDto {
  private int month;
  private int day;
  private List<CategoryTodoDto> categoryTodos;

  public static class MonthTodoPage extends PageImpl<MonthTodoDto> {

    public MonthTodoPage(List<MonthTodoDto> content, Pageable pageable, long total) {
      super(content, pageable, total);
    }
  }
}
