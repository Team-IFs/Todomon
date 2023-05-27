package com.ifs.back.todo.service;

import com.ifs.back.exception.BusinessLogicException;
import com.ifs.back.todo.entity.Todo;
import com.ifs.back.todo.exception.TodoExceptionCode;
import com.ifs.back.todo.repository.TodoRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
@Service
public class TodoService {

  private final TodoRepository todoRepository;

  @Transactional
  public Todo createTodo (Todo todo) {
    LocalDate localDate = LocalDateTime.now().toLocalDate();
    todo.setStartAt(localDate);
    todo.setEndAt(localDate);
    return todoRepository.save(todo);
  }

  @Transactional
  public Todo updateTodo(Todo todo, long memberId){
    Todo findTodo = findVerifiedTodo(todo.getTodoId(), memberId);

    Optional.ofNullable(todo.getTodoName())
        .ifPresent(findTodo::setTodoName);
    Optional.ofNullable(todo.getStartAt())
        .ifPresent(findTodo::setStartAt);
    Optional.ofNullable(todo.getEndAt())
        .ifPresent(findTodo::setEndAt);
    Optional.ofNullable(todo.getRepeated())
        .ifPresent(findTodo::setRepeated);
    Todo savedTodo = todoRepository.save(findTodo);
    log.info("## updated todo: {}", savedTodo);
    return savedTodo;
  }

  @Transactional
  public void updateTodoDone(long todoId, long memberId){
    Todo findTodo = findVerifiedTodo(todoId, memberId);
    findTodo.setDone(true);
    todoRepository.save(findTodo);
  }

  @Transactional
  public void updateTodoUndone(long todoId, long memberId){
    Todo findTodo = findVerifiedTodo(todoId, memberId);
    findTodo.setDone(false);
    todoRepository.save(findTodo);
  }
  @Transactional
  public void deleteTodo(long todoId){
    todoRepository.deleteById(todoId);
  }

  public Todo findVerifiedTodo(long todoId, long memberId){
    Optional<Todo> optionalTodo = todoRepository.findById(todoId);
    Todo todo = optionalTodo.orElseThrow(() -> new BusinessLogicException(TodoExceptionCode.TODO_NOT_FOUND));
    checkTodoMember(todo, memberId);
    return todo;
  }

  private void checkTodoMember(Todo todo, long memberId){
    if(todo.getCategory().getMember().getMemberId() != memberId)
      throw new BusinessLogicException(TodoExceptionCode.TODO_NOT_ALLOWED);
  }

}
