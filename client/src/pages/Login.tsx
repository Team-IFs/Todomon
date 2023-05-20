import React from 'react'
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { useRouter } from '../hooks/useRouter'
import cat from '../assets/cat.png'

const Login = () => {
  const { routeTo } = useRouter()
  const LoginPage = styled.div({
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 80px)',
    alignItems: 'center',
    justifyContent: 'center',
  })

  const Cat = () => {
    return <img alt="cat" src={cat} width='80px'/>
  }

  const LogoLabel = styled.div({
    font: 'bold 1.2em sans-serif',
    margin: '20px'
  })

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
  return (<LoginPage>
    <Cat />
    <LogoLabel>TODOMON</LogoLabel>
    <Form>
      <TextField label="이메일" type="email" variant="standard"/>
      <TextField label="비밀번호" type="password" variant="standard"/>
      <ButtonContainer>
        <Button variant="outlined">로그인</Button>
      </ButtonContainer>
      <BottomLogin>
        <Button variant="text">비밀번호 찾기</Button>
        <Button variant="text" onClick={()=> routeTo('/signup')}>회원가입</Button>
      </BottomLogin>
      <Divider>간편 로그인</Divider>
      <ButtonContainer>
        <Button variant="outlined">소셜1 로그인</Button>
        <Button variant="outlined">소셜2 로그인</Button>
        <Button variant="outlined">소셜3 로그인</Button>
      </ButtonContainer>
    </Form>
  </LoginPage>)
}

export default Login
