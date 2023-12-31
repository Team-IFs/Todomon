import { DELETE, GET, PATCH, POST } from './axios';
import { removeCookie, setCookie } from '../cookies/cookies';

export interface UserData {
  username: string
  password: string
};

export interface UserEmail {
  email: string
}

type Result = 'SUCCESS' | 'FAIL';
export type TokenObject = {
  'accessJwtToken': string,
  'refreshJwtToken': string
}


export const loginRequest = async (userData: UserData): Promise<Result> => {
  try {
    const response = await POST('/login', userData);
    setCookie('accessJwtToken', response.headers.authorization);
    setCookie('refreshJwtToken', response.headers.refresh);
    return 'SUCCESS';
  } catch (error) {
    console.log(error);
    return 'FAIL';
  }
}

export const googleLoginRequest = async (token: any): Promise<TokenObject> => {
  try {
    const response = await GET(`/social/google?${token}`);
    setCookie('accessJwtToken', response.data.accessJwtToken);
    setCookie('refreshJwtToken', response.data.refreshJwtToken);
    return {
      'accessJwtToken': response.data.accessJwtToken,
      'refreshJwtToken': response.data.refreshJwtToken
    }
  } catch (error) {
    console.log(error);
    return {
      'accessJwtToken': '',
      'refreshJwtToken': ''
    }
  }
}

export const newPasswordRequest = async (userEmail: UserEmail): Promise<Result> => {
  try {
    await POST('/users/search/password', userEmail);
    return 'SUCCESS'
  } catch (error) {
    return 'FAIL';
  }
}

export const accountDeleteRequest = async (): Promise<Result> => {
  try {
    await DELETE('/users/me');
    removeCookie('accessJwtToken');
    removeCookie('refreshJwtToken');
    return 'SUCCESS';
  } catch (error) {
    console.log(error);
    return 'FAIL';
  }
}

export const updateRequest = async (data: any): Promise<Result> => {
  try {
    PATCH('/users/me/password', data)
    return 'SUCCESS';
  } catch (error) {
    console.log(error);
    return 'FAIL';
  }
}