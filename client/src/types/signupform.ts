export interface SingupForm {
  email: string
  nickname: string
  password: string
  passwordConfirmation: string
}

export interface SignupRequestForm {
  email: string
  password: string
  nickname: string
  bio: string | null
}