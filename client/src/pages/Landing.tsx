import styled from '@emotion/styled'
import { ReactComponent as CatBasic } from '../assets/cat-basic.svg';
import Button from '@mui/material/Button';
import { useRouter } from '../hooks/useRouter';
import { useEffect } from 'react';
import useLogin from '../hooks/useLogin';
import { getCookie } from '../utils/cookies/cookies';
import { getMyUserInfo } from '../utils/axios/userInfo';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../recoil/atoms/atoms';

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
  const { setIsLogin } = useLogin();
  const [, setUserInfo] = useRecoilState(UserInfo);


  useEffect(() => {
    if (getCookie('accessJwtToken')) {
      getMyUserInfo().then(userInfo => {
          if(userInfo) setUserInfo(userInfo);
      });
      routeTo('/home');
      alert('로그인되었습니다!');
      setIsLogin(true);
    }
  });

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