import * as React from 'react';
import { useRouter } from '../hooks/useRouter'
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Logo from '../assets/logo';


const SearchBar = styled.div({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid',
  borderRadius: '5px',
  justifyContent: 'center',
  padding: '5px',
  '&:hover': {
    backgroundColor: '#eeeeee',
  },
})

const SearchIconWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const SearchInput = styled.input({
  border: 'none',
  padding: '5px',
  outline: 'none',
  backgroundColor: 'transparent',
})

const Header = () => {
  const { routeTo } = useRouter()
  const [isLogin, setIsLogin] = React.useState(false);

  const handleLogoClick = (path: string) => {
    routeTo(path)
  };
  const handleLoginClick = () => {
    setIsLogin(!isLogin)
  }
  return (
    <div className='header'>
      <div className='logo' onClick={() => handleLogoClick('/')} >
        <Logo />
      </div>
        {isLogin
        ? <div className='login-area'>
            <SearchBar>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <SearchInput placeholder="search" />
            </SearchBar>
            <Button variant="contained" onClick={() => handleLoginClick()}>Logout</Button>
          </div>
        : <Button variant="contained" onClick={() => handleLoginClick()}>Login</Button>}
      </div>
    
  );
}
export default Header;