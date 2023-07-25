import { GET, PATCH, PATCH_NODATA, POST } from './axios';
import { getCookie } from '../cookies/cookies';
import { today } from '../today';

type Result = 'SUCCESS' | 'FAIL';

/**
 * 특정 날짜의 할 일을 가져오는 함수
 * @param date
 */
export const getTodaysTodo = async () => {
  const requestHeader = {
    headers: {
      Authorization: `Bearer ${getCookie('accessJwtToken')}`,
    },
    params: {
      date: '2023-07-25', //TODO: 파라미터로 받은 date로 변경해야함
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
    date: '2023-07-25'
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
 * 특정 할 일의 index를 업데이트 하는 함수
 * @param todoId
 * @param newIdx
 */
export const setTodoIndex = async (todoId: number, newIdx: number) => {
  const requestHeader = {
    params: {
      idx: newIdx
    }
  }
  try {
    const response = await PATCH(`/users/me/todos/${todoId}`, requestHeader);
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