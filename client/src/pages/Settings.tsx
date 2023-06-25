import React, { useEffect } from 'react'
import { useRouter } from '../hooks/useRouter';
import { useRecoilState } from 'recoil';
import { IsLogin } from '../recoil/atoms/atoms';
import AccountSetting from '../components/Settings/AccountSetting';
import ThemeSetting from '../components/Settings/ThemeSetting';
import TodomonSetting from '../components/Settings/TodomonSetting';
import styled from '@emotion/styled';

  const SettingContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100vw - 210px)',
    height: 'calc(100vh - 80px)',
    backgroundColor: 'beige'
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
    <AccountSetting />
    <ThemeSetting />
    <TodomonSetting/>
    </SettingContainer>
      </div>)
}

export default Settings 
