import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { UserInfo, DarkMode } from '../../recoil/atoms/atoms';
import MaterialUISwitch from './MaterialUISwitch';

  const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0px 40px 20px',
  })
  const ContentContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    width: '300px',
    gap: '10px',
    margin: '0px 40px',
    fontWeight: 'bold'
  })

const ThemeSetting = () => {
  const handleClick = () => {
    console.log('dark mode toggle clicked')
  };
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [isDarkMode, setDarkMode] = useRecoilState(DarkMode);

  return (
    <Container>
      <h2>테마</h2>
      <ContentContainer>
        <label>밝게</label>
        <MaterialUISwitch />
        <label>어둡게</label>
      </ContentContainer>
    </Container>
  )
};
export default ThemeSetting;