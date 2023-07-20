package com.ifs.back.todo.controller;

import com.ifs.back.category.entity.Category;
import com.ifs.back.category.service.CategoryService;
import com.ifs.back.member.service.MemberService;
import com.ifs.back.todo.dto.CategoryTodoDto;
import com.ifs.back.todo.dto.MonthTodoDto;
import com.ifs.back.todo.dto.TodoDto;
import com.ifs.back.todo.entity.Todo;
import com.ifs.back.todo.mapper.TodoMapper;
import com.ifs.back.todo.service.CategoryTodoService;
import com.ifs.back.todo.service.TodoService;
import com.ifs.back.util.UriCreator;
import com.ifs.back.util.Util;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "Todo", description = "할 일 API")
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

  @Operation(summary = "할 일 생성")
  @PostMapping("/{category_id}")
  public ResponseEntity postTodo(@PathVariable("category_id") @Positive long categoryId,
      @Valid @RequestBody TodoDto.TodoPost requestBody, Principal principal) {
    log.info("## 할 일 생성");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Todo todo = mapper.todoPostToTodo(requestBody);
    Category category = categoryService.findVerifiedCategory(categoryId, currentId);
    todo.setCategory(category);
    todo.setIdx(category.getTodos().size());
    Todo createdTodo = todoService.createTodo(todo);
    URI uri = UriCreator.createUri("/users/me/todos", createdTodo.getTodoId());
    return ResponseEntity.created(uri).build();
  }

  @Operation(summary = "할 일 세부사항 설정")
  @PatchMapping("/{todo_id}")
  public ResponseEntity patchTodo(@PathVariable("todo_id") @Positive long todoId,
      @Valid @RequestBody TodoDto.TodoPatch requestBody, Principal principal) {
    log.info("## 할 일 세부사항 설정");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    Todo todo = mapper.todoPatchToTodo(requestBody);
    todo.setTodoId(todoId);
    Todo updatedTodo = todoService.updateTodo(todo, currentId);
    return ResponseEntity.ok().body(mapper.todoToTodoResponse(updatedTodo));
  }

  @Operation(summary = "할 일 완료", description = "{todo_id}를 할 일 완료상태로 변경")
  @PatchMapping("/{todo_id}/done")
  public ResponseEntity patchTodoDone(@PathVariable("todo_id") @Positive long todoId,
      Principal principal) {
    log.info("## 할 일 완료");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    todoService.updateTodoDone(todoId, currentId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @Operation(summary = "할 일 미완료", description = "{todo_id}를 할 일 미완료상태로 변경")
  @PatchMapping("/{todo_id}/undone")
  public ResponseEntity patchTodoUndone(@PathVariable("todo_id") @Positive long todoId,
      Principal principal) {
    log.info("## 할 일 미완료");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    todoService.updateTodoUndone(todoId, currentId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @Operation(summary = "할 일 삭제")
  @DeleteMapping("/{todo_id}")
  public ResponseEntity deleteTodo(@PathVariable("todo_id") @Positive long todoId) {
    log.info("## 할 일 삭제");
    todoService.deleteTodo(todoId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @Operation(summary = "특정 날짜 별 할 일 확인", description = "해당 date의 category와 todo를 조회",responses = {
      @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = CategoryTodoDto.CategoryTodoPage.class)))})
  @GetMapping
  public ResponseEntity getTodo(
      @Parameter(name = "date", description = "yyyy-mm-dd", required = true)
      @RequestParam(value = "date", required = true) String date,
      @PageableDefault Pageable pageable,
      Principal principal
  ) {
    log.info("## 월간 달력에서 할 일 확인");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    return ResponseEntity.ok().body(
        categoryTodoService.findCategoryTodo(currentId, currentId, date, pageable));
  }

  @Operation(summary = "월 별 할 일 확인", description = "해당 year&month의 category와 todo를 조회", responses = {
      @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = MonthTodoDto.MonthTodoPage.class)))})
  @GetMapping("/calendar")
  public ResponseEntity getMonthTodo(
      @Parameter(name = "year", description = "연도", required = true)
      @RequestParam(value = "year", required = true) Integer year,
      @Parameter(name = "month", description = "달", required = true)
      @RequestParam(value = "month", required = true) @Min(1) @Max(12) Integer month,
      @PageableDefault Pageable pageable,
      Principal principal
  ) {
    log.info("## 월간 달력에서 할 일 확인");
    Long currentId = memberService.findMemberIdByEmail(Util.checkPrincipal(principal));
    return ResponseEntity.ok().body(
        categoryTodoService.findMonthCategoryTodo(currentId, currentId, year, month, pageable));
  }
}
