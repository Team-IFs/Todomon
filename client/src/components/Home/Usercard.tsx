import styled from '@emotion/styled';
import cat from '../../assets/cat.png'

  const Cat = () => {
    return <img alt="cat" src={cat} width='80px'/>
  }

const Card = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  alignItems: 'center',
  backgroundColor: 'white',
  width: '90%',
  margin: '10px',
  borderRadius: '10px',
  padding: '10px'
})
const UserCat = styled.div({
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
        <Cat />
      </UserCat>
      <InfoCard>
        <div className='name'>닉네임</div>
        <div>자기소개</div>
      </InfoCard>
    </Card>
  )
}
export default UserCard