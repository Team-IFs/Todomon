package com.ifs.back.todo.service;

import com.ifs.back.exception.BusinessLogicException;
import com.ifs.back.todo.dto.CategoryTodoDto;
import com.ifs.back.category.entity.Category;
import com.ifs.back.category.service.CategoryService;
import com.ifs.back.friend.service.FriendService;
import com.ifs.back.todo.dto.TodoDto;
import com.ifs.back.todo.dto.MonthTodoDto;
import com.ifs.back.todo.dto.TodoDto.TodoResponse;
import com.ifs.back.todo.exception.TodoExceptionCode;
import com.ifs.back.todo.mapper.TodoMapper;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class CategoryTodoService {

  private final FriendService friendService;
  private final CategoryService categoryService;
  private final TodoMapper todoMapper;

  public Page<CategoryTodoDto> findCategoryTodo(long targetId, long memberId, String date,
      Pageable pageable) {
    int scope = checkScope(targetId, memberId);
    Page<Category> categories = categoryService.findCategoriesByMemberId(targetId, scope, pageable);
    return categoryToCategoryTodoDtos(categories, date);
  }

  private Page<CategoryTodoDto> categoryToCategoryTodoDtos(Page<Category> categories, String date) {
    Page<CategoryTodoDto> categoryTodoDtoPage = categories.map(
        category -> categoryToCategoryTodoDto(category));
    return checkRepeated(categoryTodoDtoPage, LocalDate.parse(date, DateTimeFormatter.ISO_DATE));
  }

  public Page<MonthTodoDto> findMonthCategoryTodo(long targetId, long memberId, int year, int month,
      Pageable pageable) {
    int scope = checkScope(targetId, memberId);
    Page<Category> categories = categoryService.findCategoriesByMemberId(targetId, scope, pageable);
    Calendar cal = Calendar.getInstance();
    cal.set(year, month-1, 1);
    int daysOfMonth = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
    List<MonthTodoDto> monthTodoDtoList = new ArrayList<>();
    for (int i = 1; i <= daysOfMonth; i++) {
      MonthTodoDto monthTodoDto = MonthTodoDto.builder().month(month).day(i)
          .categoryTodos(
              categoryToCategoryTodoDtos(categories,
                  LocalDate.of(year, month, i).toString()).getContent()).build();
      monthTodoDtoList.add(monthTodoDto);
    }
    return new PageImpl<>(monthTodoDtoList);
  }

  public int checkScope(long targetId, long memberId) {
    if (targetId == memberId) {
      return 2;
    }
    else if (friendService.findFriendByUsers(memberId, targetId).isEmpty()) {
      return 0;
    } else {
      return 1;
    }
  }

  private CategoryTodoDto categoryToCategoryTodoDto(Category category) {
    return CategoryTodoDto.builder().categoryColor(category.getCategoryColor())
        .categoryId(category.getCategoryId())
        .categoryName(category.getCategoryName()).isHide(category.isHide())
        .scope(category.getScope())
        .idx(category.getIdx())
        .todos(todoMapper.todosToTodoResponses(category.getTodos())).build();
  }

  private Page<CategoryTodoDto> checkRepeated(Page<CategoryTodoDto> page, LocalDate date) {
    page.map(categoryTodoDto -> {
      Iterator it = categoryTodoDto.getTodos().iterator();
      while (it.hasNext()) {
        TodoDto.TodoResponse response = (TodoResponse) it.next();
        if (date.isAfter(response.getEndAt()) || date.isBefore(response.getStartAt())) {
          it.remove();
        } else if(response.getRepeated() != null) {
          String[] repeatedDay = response.getRepeated().substring(2).split(",");
          switch (response.getRepeated().charAt(0)){
            case 'M':
              if (!Arrays.asList(repeatedDay).contains(Integer.toString(date.getDayOfMonth()))) {
                it.remove();
              }
              break;
            case 'W':
              int dayOfWeek = date.getDayOfWeek().getValue();
              if (!Arrays.asList(repeatedDay).contains(Integer.toString(dayOfWeek))) {
                it.remove();
              }
              break;
            default:
              break;
          }
        }
      }
      return page;
    });
    return page;
  }
}
