package com.ifs.back.todo.controller;

import com.ifs.back.category.service.CategoryService;
import com.ifs.back.member.service.MemberService;
import com.ifs.back.todo.dto.TodoDto;
import com.ifs.back.todo.entity.Todo;
import com.ifs.back.todo.mapper.TodoMapper;
import com.ifs.back.todo.service.CategoryTodoService;
import com.ifs.back.todo.service.TodoService;
import com.ifs.back.util.UriCreator;
import com.ifs.back.util.Util;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.net.URI;
import java.security.Principal;
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
import org.springframework.security.core.parameters.P;
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
  private final MemberService memberService;
  private final CategoryTodoService categoryTodoService;
  private final TodoService todoService;
  private final TodoMapper mapper;

  @ApiOperation(value = "할 일 생성")
  @PostMapping("/{category_id}")
  public ResponseEntity postTodo(@PathVariable("category_id") @Positive long categoryId,
      @Valid @RequestBody TodoDto.Post requestBody, Principal principal) {
    log.info("## 할 일 생성");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Todo todo = mapper.todoPostToTodo(requestBody);
    todo.setCategory(categoryService.findVerifiedCategory(categoryId, currentId));
    Todo createdTodo = todoService.createTodo(todo);
    URI uri = UriCreator.createUri("/users/me/todos", createdTodo.getTodoId());
    return ResponseEntity.created(uri).build();
  }

  @ApiOperation(value = "할 일 세부사항 설정")
  @PatchMapping("/{todo_id}")
  public ResponseEntity patchTodo(@PathVariable("todo_id") @Positive long todoId,
      @Valid @RequestBody TodoDto.Patch requestBody, Principal principal) {
    log.info("## 할 일 세부사항 설정");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Todo todo = mapper.todoPatchToTodo(requestBody);
    todo.setTodoId(todoId);
    Todo updatedTodo = todoService.updateTodo(todo, currentId);
    return ResponseEntity.ok().body(mapper.todoToTodoResponse(updatedTodo));
  }

  @ApiOperation(value = "할 일 완료")
  @PatchMapping("/{todo_id}/done")
  public ResponseEntity patchTodoDone (@PathVariable("todo_id") @Positive long todoId,
      Principal principal) {
    log.info("## 할 일 완료");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    todoService.updateTodoDone(todoId, currentId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @ApiOperation(value = "할 일 미완료")
  @PatchMapping("/{todo_id}/undone")
  public ResponseEntity patchTodoUndone (@PathVariable("todo_id") @Positive long todoId,
      Principal principal) {
    log.info("## 할 일 미완료");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    todoService.updateTodoUndone(todoId, currentId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @ApiOperation(value = "할 일 삭제")
  @DeleteMapping("/{todo_id}")
  public ResponseEntity deleteTodo(@PathVariable("todo_id") @Positive long todoId) {
    log.info("## 할 일 삭제");
    todoService.deleteTodo(todoId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @ApiOperation(value = "특정 날짜 할 일 확인")
  @GetMapping
  public ResponseEntity getTodo(
      @ApiParam(name = "date", value = "yyyy-mm-dd", required = true)
      @RequestParam(value = "date", required = true) String date,
      @PageableDefault Pageable pageable,
      Principal principal
      ) {
    log.info("## 월간 달력에서 할 일 확인");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    return ResponseEntity.ok().body(
        categoryTodoService.findCategoryTodo(currentId, currentId, date, pageable));
  }

  @ApiOperation(value = "월간 할 일 확인")
  @GetMapping("/calendar")
  public ResponseEntity getMonthTodo(
      @ApiParam(name = "year", value = "년도", required = true)
      @RequestParam(value = "year", required = true) Integer year,
      @ApiParam(name = "month", value = "달", required = true)
      @RequestParam(value = "month", required = true)@Min(1) @Max(12)  Integer month,
      @PageableDefault Pageable pageable,
      Principal principal
  ) {
    log.info("## 월간 달력에서 할 일 확인");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    return ResponseEntity.ok().body(
        categoryTodoService.findMonthCategoryTodo(currentId, currentId, year, month, pageable));
  }
}