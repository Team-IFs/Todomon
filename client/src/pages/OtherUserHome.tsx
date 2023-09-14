import styled from '@emotion/styled';
import UserCard from '../components/OtherUserHome/User/Usercard';
import TodoContainer from '../components/OtherUserHome/Todo/TodoContainer';
import Cal from '../components/OtherUserHome/Calendar/Cal';
import { useEffect, useState } from 'react';
import { CurrentClickedUser, IsLogin } from '../recoil/atoms/atoms';
import { useRouter } from '../hooks/useRouter';
import { useRecoilState } from 'recoil';
import { User } from '../types/user';

  const HomePage = styled.div({
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    height: 'calc(100vh - 80px)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  })
  const UserTodoContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  })
  const CalendarContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: '50px',
  })

const OtherUserHome = () => {
  const { routeTo } = useRouter();
  const [isLogin] = useRecoilState(IsLogin);
  const [currentClickedUser, setCurrentClickedUser] = useRecoilState(CurrentClickedUser);

  useEffect(() => {
    if (!isLogin) {
        alert('로그인이 필요한 페이지입니다.')
      routeTo('/login')
    }
  });
  
  return (
    <HomePage>
      <UserTodoContainer>
        <UserCard currentUser={currentClickedUser} />
        <TodoContainer/>
      </UserTodoContainer>
      <CalendarContainer>
        <Cal/>
      </CalendarContainer>
  </HomePage>)
}

export default OtherUserHome
