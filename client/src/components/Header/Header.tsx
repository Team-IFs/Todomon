import { useRouter } from '../../hooks/useRouter'
import Button from '@mui/material/Button';
import Logo from '../../assets/logo';
import { useRecoilState } from 'recoil';
import { IsLogin } from '../../recoil/atoms/atoms';
import AccountMenu from './AccountMenu';
import Search from './Search';

const Header = () => {
  const { routeTo } = useRouter()
  const [isLogin] = useRecoilState(IsLogin);

  const handleLogoClick = () => {
    if (isLogin) {
      routeTo('/home')
    } else {
      routeTo('/')
    }
  };
  const handleLoginClick = () => {
    routeTo('/login')
  }

  return (
    <div className='header'>
      <div className='logo' onClick={handleLogoClick} >
        <Logo />
      </div>
        {isLogin
        ? <div className='login-area'>
          <Search />
          <AccountMenu />
          </div>
        : <Button variant='contained' onClick={handleLoginClick}>Login</Button>}
      </div>
    
  );
}
export default Header;