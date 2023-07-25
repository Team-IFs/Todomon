import { GET, PATCH, PATCH_NODATA } from './axios';
import { getCookie } from '../cookies/cookies';
import { today } from '../today';

type Result = 'SUCCESS' | 'FAIL';

export const getTodaysTodo = async () => {
  const requestHeader = {
    headers: {
      Authorization: `Bearer ${getCookie('accessJwtToken')}`,
    },
    params: {
      date: '2023-07-25',
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