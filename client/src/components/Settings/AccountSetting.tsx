import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../../recoil/atoms/atoms';
import { useState } from 'react';

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

const AccountSetting: React.FC<{ changeNewUsername: any, changeNewBio: any }>
  = ({ changeNewUsername, changeNewBio }) => {
  const [userInfo] = useRecoilState(UserInfo);
  const [newUsername, setNewUsername] = useState(userInfo.nickname);
  const [newBio, setNewBio] = useState(userInfo.bio);

  const handleUsernameChange = (e: any) => {
    setNewUsername(e.target.value)
    changeNewUsername(newUsername)
  }
  const handleBioChange = (e: any) => {
    setNewBio(e.target.value);
    changeNewBio(newBio)
  }

  return (
    <Container>
      <h2>개인정보관리</h2>
      <ContentContainer>
        <InputContainer>
          <label>닉네임</label>
          <ButtonContainer>
            <Input type='text' fullWidth={true} defaultValue={userInfo.nickname} value={newUsername} onBlur={handleUsernameChange} onChange={handleUsernameChange}/>
          </ButtonContainer>
        </InputContainer>
        <InputContainer>
          <label>자기소개</label>
          <ButtonContainer>
            <Input type='text' fullWidth={true} defaultValue={userInfo.bio} value={newBio} onBlur={handleBioChange} onChange={handleBioChange}/>
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
            <Button type='submit' variant='outlined' fullWidth={true}>계정 삭제</Button>
          </ButtonContainer>
        </InputContainer>
      </ContentContainer>
    </Container>
  )
};
export default AccountSetting;