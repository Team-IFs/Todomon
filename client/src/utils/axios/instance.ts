import axios from 'axios';
import { getCookie, removeCookie } from './../cookies/cookies';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessJwtToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return new Promise((resolve, reject) => {
      if (error.response.status === 401 && error.config) {
        alert('로그인 실패')
        if (window.location.pathname !== '/login') {
          removeCookie('accessJwtToken');
          window.location.replace('/');
        }
        return;
      }
      if (error.response.status === 404 && error.config) {
        alert('요청에 실패하였습니다')
        throw new Error(error.response.data.message || '요청에 실패하였습니다');
      }
      alert('다시 시도해주세요')
      throw new Error(error.response.data.message || '다시 시도해주세요');
    });
  }
);
