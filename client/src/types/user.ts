import { TodomonColor } from './todomon';

export interface User {
  bio: string,
  memberId: number,
  memberStatus: string,
  nickname: string,
  premium: boolean,
  todomon: TodomonColor
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

export interface FriendInterface {
  friendId: number;
  friend: User;
  accepted: boolean;
}

export interface FollowInterface {
  followId: number;
  follow: User;
}

export interface UserCardProps {
  nickname: string;
  bio: string;
  todomon: TodomonColor;
  friendId: number;
  isFriendSetting: boolean;
}