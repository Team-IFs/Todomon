import styled from '@emotion/styled';
import UserCard from '../components/Home/User/Usercard';
import TodoContainer from '../components/Home/Todo/TodoContainer';
import Cal from '../components/Home/Calendar/Cal';
import { useEffect } from 'react';
import { IsLogin } from '../recoil/atoms/atoms';
import { useRouter } from '../hooks/useRouter';
import { useRecoilState } from 'recoil';
import { getCookie } from '../utils/cookies/cookies';

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

const Home = () => {
  const { routeTo } = useRouter();
  useEffect(() => {
    if (!getCookie('accessJwtToken')) {
        alert('로그인이 필요한 페이지입니다.')
      routeTo('/login')
    }
  });

  
  return (
    <HomePage>
      <UserTodoContainer>
        <UserCard />
        <TodoContainer/>
      </UserTodoContainer>
      <CalendarContainer>
        <Cal/>
      </CalendarContainer>
  </HomePage>)
}

export default Home
