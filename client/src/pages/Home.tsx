import styled from '@emotion/styled';
import UserCard from '../components/Home/User/Usercard';
import TodoContainer from '../components/Home/Todo/TodoContainer';
import Calendar from '../components/Home/Calendar/Calendar';
import React from 'react';

const Home = () => {
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

  return (
    <HomePage>
      <UserTodoContainer>
        <UserCard />
        <TodoContainer/>
      </UserTodoContainer>
      <CalendarContainer>
        <Calendar/>
      </CalendarContainer>
  </HomePage>)
}

export default Home
