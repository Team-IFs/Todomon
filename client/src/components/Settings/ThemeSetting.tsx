import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { UserInfo, DarkMode } from '../../recoil/atoms/atoms';
import MaterialUISwitch from './MaterialUISwitch';

  const TitleContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    margin: '20px'
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
    <TitleContainer>
      <h2>테마</h2>
      <ContentContainer>
        <label>밝게</label>
        <MaterialUISwitch />
        <label>어둡게</label>
      </ContentContainer>
    </TitleContainer>
  )
};
export default ThemeSetting;