import { useState, useEffect } from 'react';
import { getCookie } from '../utils/cookies/cookies';

const useLogin = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getCookie('accessJwtToken') ? setLoggedIn(true) : setLoggedIn(false);
  }, []);
  const setIsLogin = (value:boolean): void => { 
    setLoggedIn(value);
  }

  return {
    isLoggedIn,
    setIsLogin
  };
};

export default useLogin;
