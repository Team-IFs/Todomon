import { User } from '../../types/user';
import { GET } from './axios';
import { getCookie } from '../cookies/cookies';

export const getCurrentUserInfo = async (): Promise<User | null> => {
  const requestHeader = {
    headers: {
      Authorization: `Bearer ${getCookie('accessJwtToken')}`,
    },
  }
  try {
    const response = await GET('/users/me', requestHeader);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getUserSearch = async (email: string) => {
  const requestHeader = {
    params: {
      email: email
    }
  }
  try {
    const response = await GET('/users/search', requestHeader);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
