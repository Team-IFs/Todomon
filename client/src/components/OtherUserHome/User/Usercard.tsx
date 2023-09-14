import styled from '@emotion/styled';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../../../recoil/atoms/atoms';
import { getCookie } from '../../../utils/cookies/cookies';
import { getCurrentUserInfo } from '../../../utils/axios/userInfo';
import Cat from '../../../assets/Cat';
import NewCat from '../../../assets/NewCat';
import { User } from '../../../types/user';

const Card = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  alignItems: 'center',
  width: '90%',
  margin: '10px',
  gap: '20px',
  borderRadius: '10px',
  padding: '10px',
})

const UserCat = styled.div({
  width: '70px',
  height: '70px',
  display: 'flex',

})

const InfoCard = styled.div({
  maxWidth: '220px',
  '& .name': {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  }
})

interface UserCardProps {
  currentUser: User;
}

const UserCard = ({ currentUser }: UserCardProps) => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);

   // 토큰이 있으면 로그인 상태 유지하기
  if (!userInfoLoaded) {
    if (getCookie('accessJwtToken') && getCookie('refreshJwtToken')) {
      getCurrentUserInfo(currentUser.memberId).then(userInfo => {
          if(userInfo) setUserInfo(userInfo);
      });
      setUserInfoLoaded(true);
    }
  }


  return (
    <Card>
      <UserCat>
        <NewCat todomonColor={userInfo.todomon}/>
      </UserCat>
      <InfoCard>
        <div className='name'>{userInfo? `${userInfo.nickname}` : '비로그인유저'}</div>
        <div>{userInfo && userInfo.bio ? `${userInfo.bio}` : ''}</div>
      </InfoCard>
    </Card>
  )
}
export default UserCard