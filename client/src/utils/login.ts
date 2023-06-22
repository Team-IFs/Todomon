import { POST } from './axios/axios';
import { setCookie } from './cookies/cookies';

export interface UserData {
  username: string
  password: string
};

type LoginResult = 'SUCCESS' | 'FAIL';


export const loginRequest = async (userData: UserData): Promise<LoginResult> => {

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

