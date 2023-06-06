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

  default TodoDto.Response todoToTodoResponse(Todo todo){
    if ( todo == null ) {
      return null;
    }

    TodoDto.Response.ResponseBuilder response = TodoDto.Response.builder();

    response.todoId( todo.getTodoId() );
    response.todoName( todo.getTodoName() );
    response.startAt( todo.getStartAt() );
    response.endAt( todo.getEndAt() );
    response.categoryId(todo.getCategory().getCategoryId());
    response.repeated( todo.getRepeated() );

    return response.build();
  }

  List<Response> todosToTodoResponses(List<Todo> todos);
}
