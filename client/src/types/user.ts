export interface User {
  bio: string,
  memberId: number,
  memberStatus: string,
  nickname: string,
  premium: boolean,
  todomon: {
    backgroundColor: string,
    faceColor: string,
    leftEyeColor: string,
    rightEyeColor: string,
  },
};

export interface PasswordForm {
  currentPassword: string;
  newPassword: string
  newPasswordConfirmation: string
}

export interface PasswordRequestForm {
  currentPassword: string,
  newPassword: string
}