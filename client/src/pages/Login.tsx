import styled from '@emotion/styled'
import { ReactComponent as CatBasic } from '../assets/cat-basic.svg';
import Login from '../components/Login/Login';

const LoginPage = () => {
  const LoginPage = styled.div({
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 80px)',
    alignItems: 'center',
    justifyContent: 'center',
  })

  const CatContainer = styled.div({
    width: '100px',
  })

  const LogoLabel = styled.div({
    font: 'bold 1.2em sans-serif',
    margin: '20px'
  })

  return (<LoginPage>
    <CatContainer>
      <CatBasic/>
    </CatContainer>
    <LogoLabel>TODOMON</LogoLabel>
    <Login />
  </LoginPage>)
}

export default LoginPage
