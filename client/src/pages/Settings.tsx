import { useEffect, useState } from 'react'
import { useRouter } from '../hooks/useRouter';
import { useRecoilState } from 'recoil';
import { IsLogin, UserInfo } from '../recoil/atoms/atoms';
import AccountSetting from '../components/Settings/AccountSetting';
import ThemeSetting from '../components/Settings/ThemeSetting';
import TodomonSetting from '../components/Settings/Todomon/TodomonSetting';
import styled from '@emotion/styled';
import { Button, Divider } from '@mui/material';
import { getDataLocalStorage } from '../utils/localstorage';
import { PATCH } from '../utils/axios/axios';

const SettingContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100vw - 210px)',
})

const ButtonContainer = styled.div({
  display: 'flex',
  width: '200px',
})

const ButtonRow = styled.div({
  display: 'flex',
  justifyContent: 'center',
  margin: '20px',
  gap: '20px',
})

const Settings = () => {

  const { routeTo } = useRouter();
  const [isLogin] = useRecoilState(IsLogin);
  const [userInfo] = useRecoilState(UserInfo);

  const [newUsername, setNewUsername] = useState(userInfo.nickname);
  const [newBio, setNewBio] = useState(userInfo.bio);

  const handleChangeClick = () => {
    const newTodomon = getDataLocalStorage('newTodomon')
    const newUserInfoRequest = {
      nickname: newUsername,
      bio: newBio,
    }
    PATCH('/users/me', newUserInfoRequest);
    PATCH('/users/me/todomon', newTodomon);
    alert('변경완료되었습니다.');
  };

  const changeNewUsername = (newUsername: any) => {
    setNewUsername(newUsername);
  }
  const changeNewBio = (newBio: any) => {
    setNewBio(newBio);
  }

  useEffect(() => {
    if (!isLogin) {
      alert('로그인이 필요한 페이지입니다.')
      routeTo('/login')
    }
  });

  return (<div>


    <h1>| 설정 </h1>
    <SettingContainer>
      <Divider />
      <AccountSetting changeNewUsername={changeNewUsername} changeNewBio={changeNewBio} />
      <Divider />
      <ThemeSetting />
      <Divider />
      <TodomonSetting />
      <Divider />
      <ButtonRow>
        <ButtonContainer>
          <Button id='faceColor' variant='outlined' fullWidth={true} onClick={handleChangeClick}>변경</Button>
        </ButtonContainer>
      </ButtonRow>
    </SettingContainer>
  </div>)
}

export default Settings 
