import { DELETE, GET, PATCH, PATCH_NODATA, POST } from './axios';
import { getCookie } from '../cookies/cookies';
import { today } from '../today';
import { SubItem } from '../../types/todo';

type Result = 'SUCCESS' | 'FAIL';

/**
 * 현재 선택된 월의 할 일을 가져오는 함수
 * @param year 선택된 년도(2023)
 * @param month 선택된 월(7)
 */
export const getMontlyTodo = async (year: string, month: string) => {

  try {
    const response = await GET(`/users/me/todos/calendar?year=${year}&month=${month}&page=0&size=10`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 특정 날짜의 할 일을 가져오는 함수
 * authorization required
 * @param date
 */
export const getTodaysTodo = async (date: string) => {
  const requestHeader = {
    params: {
      date: date,
      page: 0,
      size: 10
    }
  }
  try {
    const response = await GET('/users/me/todos', requestHeader);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 특정 날짜의 새로운 할 일을 추가하는 함수
 * @param categoryId
 * @param todoName
 * @param date
 */
export const setTodo = async (categoryId: number, todoName: string, date: string) => {
  const todo = {
    todoName: todoName,
    date: date,
  }
  try {
    const response = await POST(`/users/me/todos/${categoryId}`, todo);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 특정 할 일의 완료 상태를 업데이트 하는 함수
 * @param todoId
 * @param isDone
 */
export const setTodoDoneState = async (todoId: number, isDone: boolean) => {
  const doneParameter = isDone ? 'done' : 'undone';
  try {
    await PATCH_NODATA(`/users/me/todos/${todoId}/${doneParameter}`);
    return 'SUCCESS';
  } catch (error) {
    console.error(error);
    return 'FAIL';
  }
}

/**
 * 특정 할 일의 세부정보를 업데이트 하는 함수
 * @param todoId
 * @param newTodo
 */
export const setTodoDetail = async (todoId: number, newTodo: SubItem) => {
  const params = {
    todoName: newTodo.todoName,
    startAt: newTodo.startAt,
    endAt: newTodo.endAt,
    repeated: newTodo.repeated
  }
  try {
    const response = await PATCH(`/users/me/todos/${todoId}`, params);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 특정 할 일의 index를 업데이트 하는 함수
 * 
 * 같은 카테고리 내에서 할 일을 이동 할 때
 * @param todoId 옮길 대상 할 일 아이디
 * @param newIdx 도착지에서의 할 일 인덱스
 *
 * 
 * 다른 카테고리로 할 일을 이동 할 때
 * @param todoId 옮길 대상 할 일 아이디
 * @param newIdx 도착지 카테고리내부에서의 옮길 대상이 정착할 인덱스
 * @param categoryId 도착지 카테고리 아이디
 */
export const setTodoIndex = async (todoId: number, newIdx: number, categoryId?: number) => {
  const params = categoryId ? {
    idx: newIdx,
    categoryId: categoryId
  } : {
    idx: newIdx
  }

  try {
    const response = await PATCH(`/users/me/todos/${todoId}`, params);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 특정 카테고리의 index를 업데이트 하는 함수
 * @param CategoryId
 * @param newIdx
 */
export const setCategoryIndex = async (CategoryId: number, newIdx: number) => {
  const requestHeader = {
    params: {
      idx: newIdx
    }
  }
  try {
    const response = await PATCH(`/users/me/categories/${CategoryId}`, requestHeader);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 특정 할 일을 삭제하는 함수
 * @param todoId
 */
export const deleteTodo = async (todoId: number) => {
  try {
    await DELETE(`/users/me/todos/${todoId}`);
  } catch (error) {
    console.error(error);
    return null;
  }
}