import React from 'react'
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { useRouter } from '../hooks/useRouter'
import cat from '../assets/cat.png'

const ariaLabel = { 'aria-label': 'description' };

const Signup = () => {
  const { routeTo } = useRouter()
  const SingupPage = styled.div({
    display: 'flex',
    flexDirection: 'row',
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

  const Cat = () => {
    return <img alt="cat" src={cat} width='200px'/>
  }

  const LogoLabel = styled.div({
    font: 'bold 1.2em sans-serif',
  })

  const Form = styled.div({
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    gap: '20px',
    margin: '20px 0px'
  })

  const ButtonContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '30px'
  })

  
  return (<SingupPage>
    <LogoContainer>
      <Cat />
      <LogoLabel>TODOMON</LogoLabel>
      <label>Todomon과 함께 할일을 정복해보세요</label>
    </LogoContainer>
    <Form>
      <TextField required label="이메일" type="email" variant="standard"/>
      <TextField required label="닉네임" type="text" variant="standard"/>
      <TextField required label="비밀번호" type="password" helperText="아래 규칙에 맞는 비밀번호를 사용해주세요" variant="standard" />
      <TextField required label="비밀번호 확인" type="password" variant="standard"/>

      <ButtonContainer>
        <Button variant="outlined">회원가입</Button>
      </ButtonContainer>
    </Form>
  </SingupPage>)
}

export default Signup
