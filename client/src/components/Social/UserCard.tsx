import styled from '@emotion/styled';
import { UserCardProps } from '../../types/user';
import NewCat from '../../assets/NewCat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { answerFriendRequest } from '../../utils/axios/social';
import { useEffect } from 'react';

const Card = styled.div({
  display: 'flex',
  Width: 'fit-content',
  flexDirection: 'row',
  justifyContent: 'left',
  alignItems: 'center',
  margin: '10px',
  gap: '20px',
  borderRadius: '10px',
  padding: '10px 20px',
  border: '1px solid gray'
})

const UserCat = styled.div({
  width: '70px',
  height: '70px',
  display: 'flex',
})


const UserCard = (userInfo: UserCardProps) => {

  const handleOnClick = (friendId: number, answer: 'accept' | 'deny') => {
    console.log(friendId)
    friendRequest(friendId, answer);
    
  }

  const friendRequest = (friendId: number, answer: 'accept' | 'deny') => {
      answerFriendRequest(friendId, answer).then((res) => {
        if (res) {
          console.log(res.content);
        }
      });
  }
  
  const handleUserCardClick: any = (clickedUser:any) => {
    // 클릭한 유저의 프로필 페이지로 이동
    console.log(clickedUser.friendId);
    console.log(clickedUser.nickname);

  }
  // useEffect(() => { 
  //   console.log('current user info:', userInfo.nickname);
  //   console.log(userInfo.todomon);

  // },[]);

  return (
    <Card onClick={handleUserCardClick(userInfo)}>
      <UserCat>
        <NewCat todomonColor={userInfo.todomon} />
      </UserCat>
      <div>
        <div>{userInfo.nickname}</div>
        <div>{userInfo.bio}</div>
      </div>
      {userInfo.isFriendSetting ?
        <>
          <CheckCircleIcon onClick={()=>handleOnClick(userInfo.friendId, 'accept')} />
          <CancelOutlinedIcon onClick={() => handleOnClick(userInfo.friendId, 'deny')} />
        </> : <></>
      }
    </Card>
  )
}
export default UserCard