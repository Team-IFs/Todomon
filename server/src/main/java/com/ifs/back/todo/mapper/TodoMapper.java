package com.ifs.back.todo.mapper;

import com.ifs.back.todo.dto.TodoDto;
import com.ifs.back.todo.dto.TodoDto.TodoResponse;
import com.ifs.back.todo.entity.Todo;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TodoMapper {
  default Todo todoPostToTodo(TodoDto.TodoPost todoPostDto){
    if ( todoPostDto == null ) {
      return null;
    }

    Todo.TodoBuilder todo = Todo.builder();

    todo.todoName( todoPostDto.getTodoName() );
    todo.startAt( todoPostDto.getDate() );
    todo.endAt( todoPostDto.getDate() );

    return todo.build();
  }

  Todo todoPatchToTodo(TodoDto.TodoPatch todoPatchDto);

  default TodoDto.TodoResponse todoToTodoResponse(Todo todo){
    if ( todo == null ) {
      return null;
    }

    TodoDto.TodoResponse.TodoResponseBuilder response = TodoDto.TodoResponse.builder();

    response.todoId( todo.getTodoId() );
    response.todoName( todo.getTodoName() );
    response.startAt( todo.getStartAt() );
    response.endAt( todo.getEndAt() );
    response.categoryId(todo.getCategory().getCategoryId());
    response.repeated( todo.getRepeated() );
    response.idx( todo.getIdx() );
    response.isDone( todo.isDone() );

    return response.build();
  }

  List<TodoResponse> todosToTodoResponses(List<Todo> todos);
}
