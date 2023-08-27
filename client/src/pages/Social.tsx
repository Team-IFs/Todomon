import React, { useEffect } from 'react'
import { useRouter } from '../hooks/useRouter';
import { useRecoilState } from 'recoil';
import { IsLogin } from '../recoil/atoms/atoms';
import Card from '../components/Social/UserCard';
import Tab from '../components/Social/Tab';
import styled from '@emotion/styled';

  const SocialPage = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100vw - 210px)',
    height: 'calc(100vh - 80px)'
  })
  
const Social = () => {
  const { routeTo } = useRouter();
  const [isLogin] = useRecoilState(IsLogin);

  useEffect(() => {
    if (!isLogin) {
        alert('로그인이 필요한 페이지입니다.')
        routeTo('/login')
      }
  });
  return (<SocialPage>
    <h1>
      | 친구 관리
    </h1>
    <Tab />
  </SocialPage>)
}

export default Social 
