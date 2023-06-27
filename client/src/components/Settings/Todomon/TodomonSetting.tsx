import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../../../recoil/atoms/atoms';
import Cat from '../../../assets/Cat';
import ColorPicker from './ColorPicker';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 0px 40px 20px',
})
const ContentContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '50px',
  margin: '0px 20px',
})
const ButtonContainer = styled.div({
  display: 'flex',
  width: '200px',
})
const ButtonColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '200px',
})

const UserCat = styled.div({
  width: '200px',
  height: '200px',
  display: 'flex',

})
const TodomonSetting = () => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);

  return (
    <Container>
      <h2>투두몬</h2>
      <ContentContainer>
        <UserCat>
          <Cat />
        </UserCat>
        <ButtonColumn>
          <ButtonContainer>
            <Button type='submit' variant='outlined' fullWidth={true}>얼굴</Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button type='submit' variant='outlined' fullWidth={true}>왼쪽 눈</Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button type='submit' variant='outlined' fullWidth={true}>오른쪽 눈</Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button type='submit' variant='outlined' fullWidth={true}>배경</Button>
          </ButtonContainer>
        </ButtonColumn>
        <ColorPicker />
      </ContentContainer>
    </Container>
  )
};
export default TodomonSetting;