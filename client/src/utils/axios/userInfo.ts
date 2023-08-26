import { User } from '../../types/user';
import { GET } from './axios';
import { getCookie } from '../cookies/cookies';

/**
 * 현재 로그인한 유저의 정보를 가져오는 함수
 */
export const getMyUserInfo = async (): Promise<User | null> => {
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

/**
 * 다른 유저의 정보를 가져오는 함수
 */
export const getCurrentUserInfo = async (memberId: number): Promise<User | null> => {
  const requestHeader = {
    headers: {
      Authorization: `Bearer ${getCookie('accessJwtToken')}`,
    },
  }
  try {
    const response = await GET(`/users/${memberId}`, requestHeader);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * 검색한 내용의 결과를 가져오는 함수
 */
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
