import styled from '@emotion/styled';
import UserCard from '../components/Home/Usercard';
import Todo from '../components/Home/Todo/Todo';
import Calendar from '../components/Home/Calendar/Calendar';

const Home = () => {
  const HomePage = styled.div({
    display: 'flex',
    flexDirection: 'row',
    height: 'calc(100vh - 80px)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  })
  const UserTodoContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    padding: '10px',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  })
  const CalendarContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  })

  return (
    <HomePage>
      <UserTodoContainer>
        <UserCard />
        <Todo/>
      </UserTodoContainer>
      <CalendarContainer>
        <Calendar/>
      </CalendarContainer>
  </HomePage>)
}

export default Home
