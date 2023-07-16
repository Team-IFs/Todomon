import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState } from 'recoil';
import { IsLogin, UserInfo } from '../../recoil/atoms/atoms';
import { useState } from 'react';
import { accountDeleteRequest, updateRequest } from '../../utils/axios/account';
import { useRouter } from '../../hooks/useRouter';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PasswordForm, PasswordRequestForm } from '../../types/user';
import { letterRegex, numRegex, specialRegex } from '../../utils/validations';
import { removeCookie } from '../../utils/cookies/cookies';


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


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: '10px',
  },
  '& .MuiDialogActions-root': {
    padding: '5px',
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const DetailConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  gap: 20px;
  margin: 20px;
  margin-bottom: 50px;
  padding: 0px 20px;
`

const schema = yup.object().shape({
  currentPassword:
    yup.string().required('기존 비밀번호를 입력해주세요.'),
  newPassword:
    yup.string()
      .required('새로운 비밀번호를 입력해주세요.')
      .matches(numRegex, '1개 이상의 숫자를 포함해야합니다.')
      .matches(letterRegex, '1개 이상의 영문을 포함해야합니다.')
      .matches(specialRegex, '1개 이상의 특수문자를 포함해야합니다.')
      .min(8, '8자리 이상이어야합니다.'),
    newPasswordConfirmation:
      yup.string()
      .required('새로운 비밀번호를 한번 더 입력해주세요.')
      .oneOf([yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.')
  })



const AccountSetting: React.FC<{ changeNewUsername: any, changeNewBio: any }>
  = ({ changeNewUsername, changeNewBio }) => {
    const [userInfo] = useRecoilState(UserInfo);
    const [newUsername, setNewUsername] = useState(userInfo.nickname);
    const [newBio, setNewBio] = useState(userInfo.bio);
    const [, setIsLogin] = useRecoilState(IsLogin);
    const { routeTo } = useRouter()
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleUsernameChange = (e: any) => {
      setNewUsername(e.target.value)
      changeNewUsername(newUsername)
    }
    const handleBioChange = (e: any) => {
      setNewBio(e.target.value);
      changeNewBio(newBio)
    }
    const handlePasswordChange = () => {
      setOpen(true);
    }
    const handleAccountDelete = async () => {
      const res = await accountDeleteRequest()
      // delete success
      if (res === 'SUCCESS') {
        setIsLogin(false);
        alert('계정을 성공적으로 삭제했습니다.');
        routeTo('/home');
      } else {
        setIsLogin(true);
      }
    }

  const formSubmitHandler: SubmitHandler<PasswordForm> = async(data: PasswordForm) => {
    try {
      const newPasswordData: PasswordRequestForm = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      }
      // update request
      const res = await updateRequest(newPasswordData)
      // update success
      if (res === 'SUCCESS') {
        alert('비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.')
        removeCookie('accessJwtToken')
        removeCookie('refreshJwtToken')
        setIsLogin(false)
        routeTo('/login')
      } else {
        alert('비밀번호 변경에 실패했습니다.')
      }
    }
    catch (error) {
      console.log(error)
      alert('다시 시도해주세요')

    }
    
  }

  const { register, handleSubmit, control, formState: { errors } } = useForm<PasswordForm>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: yupResolver(schema)
  })
    
    return (
      <Container>
        <h2>개인정보관리</h2>
        <ContentContainer>
          <InputContainer>
            <label>닉네임</label>
            <ButtonContainer>
              <Input type='text' fullWidth={true} defaultValue={userInfo.nickname} value={newUsername} onBlur={handleUsernameChange} onChange={handleUsernameChange} />
            </ButtonContainer>
          </InputContainer>
          <InputContainer>
            <label>자기소개</label>
            <ButtonContainer>
              <Input type='text' fullWidth={true} defaultValue={userInfo.bio} value={newBio} onBlur={handleBioChange} onChange={handleBioChange} />
            </ButtonContainer>
          </InputContainer>
          <InputContainer>
            <label>비밀번호</label>
            <ButtonContainer>
              <Button type='submit' variant='outlined' fullWidth={true} onClick={handlePasswordChange}>비밀번호 변경</Button>
              {open && (
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    비밀번호 변경
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <form onSubmit={handleSubmit(formSubmitHandler)} >
                      <DetailConatiner>
                        <Controller name='currentPassword' control={control} defaultValue='' render={({ field }) => (
                          <TextField
                            label='기존 비밀번호'
                            type='password'
                            variant='standard'
                            {...register('currentPassword')}
                            error={!!errors.currentPassword}
                            helperText={errors.currentPassword ? errors.currentPassword?.message : ''} />
                        )} 
                        />
                        <Controller name='newPassword' control={control} defaultValue='' render={({ field }) => (
                          <TextField
                            label='새로운 비밀번호'
                            type='password'
                            variant='standard'
                            {...register('newPassword')}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword ? errors.newPassword?.message : ''} />
                        )} />
                        <Controller name='newPasswordConfirmation' control={control} defaultValue='' render={({ field }) => (
                          <TextField
                            label='새로운 비밀번호 확인'
                            type='password'
                            variant='standard'
                            {...register('newPasswordConfirmation')}
                            error={!!errors.newPasswordConfirmation}
                            helperText={errors.newPasswordConfirmation ? errors.newPasswordConfirmation?.message : ''} />
                        )} />
                      
                    <Button type='submit' variant='outlined'>변경</Button>
                      </DetailConatiner>

                    </form>
                  </DialogContent>
                </BootstrapDialog>

              )}

            </ButtonContainer>
          </InputContainer>
          <InputContainer>
            <label>계정삭제</label>
            <ButtonContainer>
              <Button type='submit' variant='outlined' fullWidth={true} onClick={handleAccountDelete}>계정 삭제</Button>
            </ButtonContainer>
          </InputContainer>
        </ContentContainer>
      </Container>
    )
  };
export default AccountSetting;