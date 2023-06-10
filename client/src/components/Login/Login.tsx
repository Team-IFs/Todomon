
import styled from '@emotion/styled';
import { useRouter } from '../../hooks/useRouter'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';


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
  const { routeTo } = useRouter()
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    console.log(email, password)
    

  }


  return (
    <>
      <Form>
        <form onSubmit={handleSubmit}>
      <TextField name='email' label='이메일' type='email' variant='standard'/>
      <TextField name='password' label='비밀번호' type='password' variant='standard'/>
      <ButtonContainer>
        <Button variant='outlined' type='submit'>로그인</Button>
          </ButtonContainer>
          </form>
      <BottomLogin>
        <Button variant='text'>비밀번호 찾기</Button>
        <Button variant='text' onClick={()=> routeTo('/signup')}>회원가입</Button>
      </BottomLogin>
      <Divider>간편 로그인</Divider>
      <ButtonContainer>
        <Button variant='outlined'>소셜1 로그인</Button>
        <Button variant='outlined'>소셜2 로그인</Button>
        <Button variant='outlined'>소셜3 로그인</Button>
      </ButtonContainer>
        </Form>
    </>
  )
}

export default Login;