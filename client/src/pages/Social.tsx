import React, { useEffect } from 'react'
import { useRouter } from '../hooks/useRouter';
import { useRecoilState } from 'recoil';
import { IsLogin } from '../recoil/atoms/atoms';
import Tab from '../components/Social/Tab';
import { getCookie } from '../utils/cookies/cookies';
import { SettingContentsLayout } from '../layout/GeneralLayout';
  
const Social = () => {
  const { routeTo } = useRouter();
  const [isLogin] = useRecoilState(IsLogin);

  useEffect(() => {
    if (!isLogin) {
        alert('로그인이 필요한 페이지입니다.')
        routeTo('/login')
      }
  });
  return (
    <>
      {getCookie('accessJwtToken') && 
        <SettingContentsLayout>
          <h1>
            | 친구 관리
          </h1>
          <Tab />
        </SettingContentsLayout>
      }
  </>
  )
}

export default Social 
