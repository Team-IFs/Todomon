import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../recoil/atoms/atoms';
import { getCookie, setCookie } from '../utils/cookies/cookies';
import { getMyUserInfo } from '../utils/axios/userInfo';

const useLogin = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [, setUserInfo] = useRecoilState(UserInfo);

  useEffect(() => {
    getCookie('accessJwtToken') ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  const login = (): any => {
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      if (accessToken) {
        const refreshToken = urlParams.get('refresh_token');
        setCookie('accessJwtToken', 'Bearer ' + accessToken);
        setCookie('refreshJwtToken', 'Bearer ' + refreshToken);
        getMyUserInfo().then(userInfo => {
          userInfo && setUserInfo(userInfo);
          return true;
        });
      };
    };
  };

  const setIsLogin = (value:boolean): void => { 
    setLoggedIn(value);
  }

  return {
    isLoggedIn,
    login,
    setIsLogin
  };
};

export default useLogin;
