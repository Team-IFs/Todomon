import styled from '@emotion/styled'
import { ReactComponent as CatBasic } from '../assets/cat-basic.svg';
import Button from '@mui/material/Button';
import { useRouter } from '../hooks/useRouter';
import { useEffect } from 'react';
import useLogin from '../hooks/useLogin';
import { googleLoginRequest } from '../utils/axios/account';

const LandingPage = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 80px)',
  alignItems: 'center',
  justifyContent: 'space-evenly',
})

const LogoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  justifyContent: 'center',
  alignItems: 'center',
})

const LogoLabel = styled.div({
  font: 'bold 1.2em sans-serif',
})

const Cat = () => {
  return <CatBasic />
}

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})
const Landing = () => {
  const { routeTo } = useRouter();
  const { login, setIsLogin } = useLogin();

  useEffect(() => {
    if (window.location.hash.includes('access_token')) { 
      googleLogin();
    }
  });

  const googleLogin = async () => {
    //구글 로그인 후 리다이렉트된 url에서 인가된 토큰 백엔드 서버에 전송
    const res = await googleLoginRequest(window.location.hash.substring(1));
    if (res === 'SUCCESS') {
      if (login()) {
        routeTo('/home');
        setIsLogin(true);
      }
    }
  }


  return (
    <>
      <LandingPage>
        <LogoContainer>
          <Cat />
          <LogoLabel>TODOMON</LogoLabel>
          <p>Todomon과 함께 할일을 정복해보세요</p>
          <ButtonContainer>
            <Button type='button' variant='outlined' onClick={() => routeTo('/login')}>로그인</Button>
          </ButtonContainer>
        </LogoContainer>

      </LandingPage>
    </>
  )
}
export default Landing;