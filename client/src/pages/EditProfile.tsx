import React, { useEffect } from 'react'
import { useRouter } from '../hooks/useRouter';
import { useRecoilState } from 'recoil';
import { IsLogin } from '../recoil/atoms/atoms';
const EditProfile = () => {

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
      EditProfile
    </h1>
    <h1>hello</h1>
  </div>)
}

export default EditProfile 
