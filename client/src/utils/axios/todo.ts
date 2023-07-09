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
      date: '2023-07-09',
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