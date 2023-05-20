import styled from '@emotion/styled';
import SettingsIcon from '@mui/icons-material/Settings';

const Card = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  height: '100%',
  backgroundColor: 'white',
  margin: '10px',
  borderRadius: '10px',
  padding: '20px'
})

const Info = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '0px 10px',
  '& .date': {
    fontSize: '1.2rem',
    fontWeight: 'bold',
      }
})

const Categories = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '0px 10px'
})

const Todo = () => {
  return (
    <Card>
      <Info>
        <div className='date'>5월 20일 토요일</div>
        <SettingsIcon/>
      </Info>
      <Categories>
        test
      </Categories>
    </Card>
  )
}
export default Todo