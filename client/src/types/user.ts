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