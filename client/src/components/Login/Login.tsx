
import styled from '@emotion/styled';
import { useRouter } from '../../hooks/useRouter'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { useRecoilState } from 'recoil';
import { IsLogin, UserInfo } from '../../recoil/atoms/atoms';
import { POST, GET } from '../../utils/axios/axios';
import { setCookie, getCookie } from '../../utils/cookies/cookies';

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

interface UserData {
  username: string
  password: string
};

const Login = () => {
  const { routeTo } = useRouter();
  const [, setIsLogin] = useRecoilState(IsLogin);
  const [, setUserInfo] = useRecoilState(UserInfo);

  async function loginRequest(userData: UserData) {
    try {
      const response = await POST('/login', userData);
      setCookie('accessJwtToken', response.headers.authorization);
      alert('로그인 성공!');
      setIsLogin(true);
      return 'SUCCESS';
    } catch (error) {
      console.log(error);
      setIsLogin(false);
      return 'FAIL';
    }
  }

  async function getUserData() {
    const requestHeader = {
      headers: {
        Authorization: `Bearer ${getCookie('accessJwtToken')}`,
      },
    }
    try {
      const response = await GET('/users/me', requestHeader);
      setUserInfo(response.data)
    } catch (error) {
      console.log(error);
      setIsLogin(false);
    }
  }

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
      getUserData();
      routeTo('/');
    }
  }


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
            <Button variant='text'>비밀번호 찾기</Button>
            <Button variant='text' onClick={() => routeTo('/signup')}>회원가입</Button>
          </BottomLogin>
          <Divider>간편 로그인</Divider>
          <ButtonContainer>
            <Button variant='outlined'>소셜1 로그인</Button>
            <Button variant='outlined'>소셜2 로그인</Button>
            <Button variant='outlined'>소셜3 로그인</Button>
          </ButtonContainer>
        </Form>
      </form>
    </>
  )
}

export default Login;