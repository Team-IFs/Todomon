import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ReactComponent as CatBasic }  from '../assets/cat-basic.svg';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { SingupFormValue } from '../types/signupform'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  const schema = yup.object().shape({
    email:
      yup.string()
        .required('이메일을 입력해주세요.')
        .matches(emailRegex, '이메일 형식에 맞지 않습니다.'),
    nickname:
      yup.string()
        .required('닉네임을 입력해주세요.')
        .max(10, '10자 이하의 닉네임만 가능합니다.'),
    password:
      yup.string()
      .required('비밀번호를 입력해주세요.'),
    passwordConfirmation:
      yup.string()
      .required('비밀번호 확인을 입력해주세요.')
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
  })
  const SingupPage = styled.div({
    display: 'flex',
    flexDirection: 'row',
    height: 'calc(100vh - 80px)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  })

  const LogoContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  })

  const Cat = () => {
    return <CatBasic />
  }

  const LogoLabel = styled.div({
    font: 'bold 1.2em sans-serif',
  })

  const Form = styled.div({
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    gap: '20px',
    margin: '20px 0px'
  })

  const ButtonContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '30px'
  })


const Signup = () => {

  const formSubmitHandler: SubmitHandler<SingupFormValue> = (data: SingupFormValue) => {
    alert('회원가입이 완료되었습니다!')
    console.log(data)
  }
    const { register, handleSubmit, control, formState: { errors } } = useForm<SingupFormValue>({
      mode: 'onChange',
      resolver: yupResolver(schema)
  })

  return (<SingupPage>
    <LogoContainer>
      <Cat />
      <LogoLabel>TODOMON</LogoLabel>
      <label>Todomon과 함께 할일을 정복해보세요</label>
    </LogoContainer>
    <form onSubmit={handleSubmit(formSubmitHandler)} >
      <Form>
        <Controller name='email' control={control} defaultValue='' render={({ field }) => (
          <TextField
            label='이메일'
            variant='standard'
            {...register('email')}
            error={!!errors.email}
            autoFocus
            helperText={errors.email ? errors.email?.message : ''} />
        )} />
        <Controller name='nickname' control={control} defaultValue='' render={({ field }) => (
          <TextField
            label='닉네임'
            variant='standard'
            {...register('nickname')}
            error={!!errors.nickname}
            helperText={errors.nickname ? errors.nickname?.message : ''} />
        )} />
        <Controller name='password' control={control} defaultValue='' render={({ field }) => (
          <TextField
            label='비밀번호'
            type='password'
            variant='standard'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? errors.password?.message : ''} />
        )} />
        <Controller name='passwordConfirmation' control={control} defaultValue='' render={({ field }) => (
          <TextField
            label='비밀번호 확인'
            type='password'
            variant='standard'
            {...register('passwordConfirmation')}
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation ? errors.passwordConfirmation?.message : ''} />
        )} />

      <ButtonContainer>
          <Button type='submit' variant='outlined'>회원가입</Button>
        </ButtonContainer>
      </Form>
    </form>
  </SingupPage>)
}

export default Signup
