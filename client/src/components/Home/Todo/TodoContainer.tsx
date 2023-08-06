import styled from '@emotion/styled';
import SettingsIcon from '@mui/icons-material/Settings';
import OuterTodo from './OuterTodo';
import {DateString, today} from '../../../utils/today'
import { useRecoilState } from 'recoil';
import { CurrentDay } from '../../../recoil/atoms/atoms';

const Card = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  height: '100%',
  border: '1px solid lightgray',
  margin: '10px',
  borderRadius: '10px',
  padding: '20px'
})

const DateInfo = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  '& .date': {
    fontSize: '1.2rem',
    fontWeight: 'bold',
      }
})

const Categories = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  width: '100%',
  height: '100%',
  padding: '10px 0',
})

const Todo = () => {
  const [currentDay, setCurrentDay] = useRecoilState(CurrentDay);
  const currentDayString = DateString(currentDay);
  return (
    <Card>
      <DateInfo>
        <div className='date'>{currentDayString}</div>
        <SettingsIcon/>
      </DateInfo>
      <Categories>
        <OuterTodo />
      </Categories>
    </Card>
  )
}
export default Todo