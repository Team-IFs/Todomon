package com.ifs.back.todo.controller;

import com.ifs.back.category.service.CategoryService;
import com.ifs.back.todo.dto.TodoDto;
import com.ifs.back.todo.entity.Todo;
import com.ifs.back.todo.mapper.TodoMapper;
import com.ifs.back.todo.service.CategoryTodoService;
import com.ifs.back.todo.service.TodoService;
import com.ifs.back.util.UriCreator;
import java.net.URI;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/me/todos")
@RequiredArgsConstructor
@Validated
@Slf4j
public class TodoController {

  private final CategoryService categoryService;
  private final CategoryTodoService categoryTodoService;
  private final TodoService todoService;
  private final TodoMapper mapper;

  @PostMapping("/{category_id}")
  public ResponseEntity postTodo(@PathVariable("category_id") @Positive long categoryId,
      @Valid @RequestBody TodoDto.Post requestBody) {
    log.info("## 할 일 생성");
    Todo todo = mapper.todoPostToTodo(requestBody);
    todo.setCategory(categoryService.findVerifiedCategory(categoryId));
    Todo createdTodo = todoService.createTodo(todo);
    URI uri = UriCreator.createUri("/users/me/todos", createdTodo.getTodoId());
    return ResponseEntity.created(uri).build();
  }

  @PatchMapping("/{todo_id}")
  public ResponseEntity patchTodo(@PathVariable("todo_id") @Positive long todoId,
      @Valid @RequestBody TodoDto.Patch requestBody) {
    log.info("## 할 일 세부사항 설정");
    Todo todo = mapper.todoPatchToTodo(requestBody);
    todo.setTodoId(todoId);
    Todo updatedTodo = todoService.updateTodo(todo);
    return ResponseEntity.ok().body(mapper.todoToTodoResponse(updatedTodo));
  }

  @PatchMapping("/{todo_id}/done")
  public ResponseEntity patchTodoDone (@PathVariable("todo_id") @Positive long todoId) {
    log.info("## 할 일 완료");
    todoService.updateTodoDone(todoId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PatchMapping("/{todo_id}/undone")
  public ResponseEntity patchTodoUndone (@PathVariable("todo_id") @Positive long todoId) {
    log.info("## 할 일 미완료");
    todoService.updateTodoUndone(todoId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping("/{todo_id}")
  public ResponseEntity deleteTodo(@PathVariable("todo_id") @Positive long todoId) {
    log.info("## 할 일 삭제");
    todoService.deleteTodo(todoId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @GetMapping
  public ResponseEntity getTodo(
      @RequestParam(value = "date", required = true) String date,
      @PageableDefault Pageable pageable
      ) {
    log.info("## 월간 달력에서 할 일 확인");
    //Todo : token구현 전 까지 memberId 1로 고정
    long memberId = 1;
    return ResponseEntity.ok().body(
        categoryTodoService.findCategoryTodo(memberId, memberId, date, pageable));
  }

  @GetMapping("/calendar")
  public ResponseEntity getMonthTodo(
      @RequestParam(value = "year", required = true) Integer year,
      @RequestParam(value = "month", required = true)@Min(1) @Max(12)  Integer month,
      @PageableDefault Pageable pageable
  ) {
    log.info("## 월간 달력에서 할 일 확인");
    //Todo : token구현 전 까지 memberId 1로 고정
    long memberId = 1;
    return ResponseEntity.ok().body(
        categoryTodoService.findMonthCategoryTodo(memberId, memberId, year, month, pageable));
  }
}
