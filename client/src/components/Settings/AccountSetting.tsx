import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../../recoil/atoms/atoms';

  const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0px 40px 20px',
  })
  const ContentContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    gap: '20px',
    margin: '0px 20px',
  })
  const InputContainer = styled.div({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    gap: '20px',
    margin: '0px 20px'
  })
  const ButtonContainer = styled.div({
    display: 'flex',
    justifyContent: 'end',
    width: '200px',
  })

const AccountSetting = () => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);

  return (
    <Container>
      <h2>개인정보관리</h2>
      <ContentContainer>
        <InputContainer>
          <label>닉네임</label>
          <ButtonContainer>
            <Input type='text' fullWidth={true} defaultValue={userInfo.nickname} />
          </ButtonContainer>
        </InputContainer>
        <InputContainer>
          <label>자기소개</label>
          <ButtonContainer>
            <Input type='text' fullWidth={true} defaultValue={userInfo.bio} />
          </ButtonContainer>
        </InputContainer>
        <InputContainer>
          <label>비밀번호</label>
          <ButtonContainer>
            <Button type='submit' variant='outlined' fullWidth={true}>비밀번호 변경</Button>
          </ButtonContainer>
        </InputContainer>
        <InputContainer>
          <label>계정삭제</label>
          <ButtonContainer>
            <Button type='submit' variant='outlined' fullWidth={true}>회원가입</Button>
          </ButtonContainer>
        </InputContainer>
      </ContentContainer>
    </Container>
  )
};
export default AccountSetting;