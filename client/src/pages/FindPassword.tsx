import styled from '@emotion/styled'
import { newPasswordRequest } from '../utils/axios/account';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from '../hooks/useRouter';
import { ReactComponent as CatBasic } from '../assets/cat-basic.svg';


  const FindPWPage = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100vh - 80px)',
    alignItems: 'center',
    justifyContent: 'center',
  })

  const CatContainer = styled.div({
    width: '200px',
  })
  
  const LogoLabel = styled.div({
    font: 'bold 1.2em sans-serif',
    margin: '20px'
  })

  const Form = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    margin: '20px',
})

const FindPassword = () => {
  const { routeTo } = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
    };
    const userEmail = {
      email: target.email.value
    }
  
    const res = await newPasswordRequest(userEmail)
    alert('임시 비밀번호를 이메일로 전송했습니다.')
    routeTo('/login');
  }


  return (
    <FindPWPage>
      <CatContainer>
        <CatBasic/>
      </CatContainer>
      <LogoLabel>TODOMON</LogoLabel>
      <div>임시비밀번호 발급을 위해 이메일을 입력해주세요.</div>
        <form onSubmit={handleSubmit}>
          <Form>
          <TextField required name='email' label='이메일' type='email' variant='standard' />
          <Button variant='outlined' type='submit'>전송</Button>
          </Form>
        </form>
  </FindPWPage>)
}

export default FindPassword
