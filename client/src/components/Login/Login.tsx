
import styled from '@emotion/styled';
import { useRouter } from '../../hooks/useRouter'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { useRecoilState } from 'recoil';
import { IsLogin, UserInfo } from '../../recoil/atoms/atoms';
import { setCookie, getCookie } from '../../utils/cookies/cookies';
import { useEffect } from 'react';
import { loginRequest } from '../../utils/axios/account';
import { getMyUserInfo } from '../../utils/axios/userInfo';

const Form = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '300px',
  gap: '10px',
  margin: '20px 0px'
})

const BottomLogin = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
})

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '30px'
})

const Login = () => {
  const { routeTo } = useRouter();
  const [, setIsLogin] = useRecoilState(IsLogin);
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const userData = {
      username: email,
      password: password
    }
    // login request
    const res = await loginRequest(userData)
    // login success
    if (res === 'SUCCESS') {
      getMyUserInfo().then(userInfo => {
          if(userInfo) setUserInfo(userInfo);
        });
      setIsLogin(true);
      alert('로그인 성공!');
      routeTo('/home');
    } else {
      setIsLogin(false);
    }
  }
  

  const googleLoginClick = () => {
    window.location.href = `${process.env.REACT_APP_GOOGLE_LOGIN_URL}`;
  }
  const kakaoLoginClick = () => {
    window.location.href = `${process.env.REACT_APP_KAKAO_LOGIN_URL}`;
  }
  const naverLoginClick = () => {
    window.location.href = `${process.env.REACT_APP_NAVER_LOGIN_URL}`;

  }

  useEffect(() => {
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      if (accessToken) {
        const refreshToken = urlParams.get('refresh_token');
        setCookie('accessJwtToken', 'Bearer ' + accessToken);
        setCookie('refreshJwtToken', 'Bearer ' + refreshToken);
        getMyUserInfo().then(userInfo => {
          if(userInfo) setUserInfo(userInfo);
        });
        setIsLogin(true);
        routeTo('/home')
      }
    }
  });



  return (
    <>
      <form onSubmit={handleSubmit}>
        <Form>
          <TextField required name='email' label='이메일' type='email' variant='standard' />
          <TextField required name='password' label='비밀번호' type='password' variant='standard' />
          <ButtonContainer>
            <Button variant='outlined' type='submit'>로그인</Button>
          </ButtonContainer>
          <BottomLogin>
            <Button variant='text' onClick={() => routeTo('/findpassword')}>비밀번호 찾기</Button>
            <Button variant='text' onClick={() => routeTo('/signup')}>회원가입</Button>
          </BottomLogin>
          <Divider>간편 로그인</Divider>
          <ButtonContainer>
            <Button variant='outlined' onClick={googleLoginClick}>구글 로그인</Button>
            <Button variant='outlined' onClick={kakaoLoginClick}>카카오 로그인</Button>
            <Button variant='outlined' onClick={naverLoginClick}>네이버 로그인</Button>
          </ButtonContainer>
        </Form>
      </form>
    </>
  )
}

export default Login;