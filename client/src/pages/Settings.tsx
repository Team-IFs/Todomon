import React, { useEffect } from 'react'
import { useRouter } from '../hooks/useRouter';
import { useRecoilState } from 'recoil';
import { IsLogin } from '../recoil/atoms/atoms';
import AccountSetting from '../components/Settings/AccountSetting';
import ThemeSetting from '../components/Settings/ThemeSetting';
import TodomonSetting from '../components/Settings/Todomon/TodomonSetting';
import styled from '@emotion/styled';
import { Divider } from '@mui/material';

  const SettingContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100vw - 210px)',
  })

const Settings = () => {

    const { routeTo } = useRouter();
  const [isLogin] = useRecoilState(IsLogin);

  useEffect(() => {
    if (!isLogin) {
        alert('로그인이 필요한 페이지입니다.')
        routeTo('/login')
      }
  });

  return (<div>


    <h1>
      | 설정
    </h1>
    <SettingContainer>
      <Divider />
      <AccountSetting />
      <Divider />
      <ThemeSetting />
      <Divider />
      <TodomonSetting/>
      <Divider />
    </SettingContainer>
      </div>)
}

export default Settings 
