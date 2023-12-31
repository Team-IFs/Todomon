import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../recoil/atoms/atoms';
import { getCookie, setCookie } from '../utils/cookies/cookies';
import { getMyUserInfo } from '../utils/axios/userInfo';
import { TokenObject } from '../utils/axios/account';

const useLogin = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [, setUserInfo] = useRecoilState(UserInfo);

  useEffect(() => {
    getCookie('accessJwtToken') ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  const login = async (tokens?: any): Promise<boolean> => {
    if (tokens) {}
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      if (accessToken) {
        const refreshToken = urlParams.get('refresh_token');
        setCookie('accessJwtToken', 'Bearer ' + accessToken);
        setCookie('refreshJwtToken', 'Bearer ' + refreshToken);
        
        const userInfo = await getMyUserInfo();

        if (userInfo) {
          setUserInfo(userInfo);
          return true;
        }
      };
    };
    return false;
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
