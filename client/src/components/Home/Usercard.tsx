import styled from '@emotion/styled';
import { ReactComponent as CatCircle } from '../../assets/cat.svg';

const Card = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  alignItems: 'center',
  width: '90%',
  margin: '10px',
  borderRadius: '10px',
  padding: '10px'
})
const UserCat = styled.div({
  width: '70px',
  margin: '10px 20px',
})

const InfoCard = styled.div({
  maxWidth: '220px',
  '& .name': {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  }
})
const UserCard = () => {
  return (
    <Card>
      <UserCat>
        <CatCircle />
      </UserCat>
      <InfoCard>
        <div className='name'>닉네임</div>
        <div>자기소개</div>
      </InfoCard>
    </Card>
  )
}
export default UserCard