import { useRecoilState } from 'recoil'
import { CurrentClickedUser } from '../recoil/atoms/atoms'
import { useRouter } from './useRouter';

export const useUserCardClick = (memberId: number): any => {
  const { routeTo } = useRouter();
  const [, setCurrentClickedUser] = useRecoilState(CurrentClickedUser);
  setCurrentClickedUser(memberId);
  routeTo('/otheruserhome');
}