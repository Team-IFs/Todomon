import styled from '@emotion/styled';
import SettingsIcon from '@mui/icons-material/Settings';
import OuterTodo from './OuterTodo';
import {today} from '../../../utils/today'

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
  backgroundColor: 'white',
  width: '100%',
  height: '100%',
  padding: '10px 0',
})

const Todo = () => {
  return (
    <Card>
      <DateInfo>
        <div className='date'>{today()}</div>
        <SettingsIcon/>
      </DateInfo>
      <Categories>
        <OuterTodo />
      </Categories>
    </Card>
  )
}
export default Todo