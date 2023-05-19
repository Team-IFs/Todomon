package com.ifs.back.todo.mapper;

import com.ifs.back.todo.dto.TodoDto;
import com.ifs.back.todo.dto.TodoDto.Response;
import com.ifs.back.todo.entity.Todo;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TodoMapper {
  Todo todoPostToTodo(TodoDto.Post todoPostDto);

  Todo todoPatchToTodo(TodoDto.Patch todoPatchDto);

  TodoDto.Response todoToTodoResponse(Todo todo);

  List<Response> todosToTodoResponses(List<Todo> todos);
}
