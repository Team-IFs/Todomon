import { DELETE, GET, PATCH, PATCH_NODATA, POST } from './axios';
import { formatDate } from '../today';
import { SubItem } from '../../types/todo';


/**
 * 내 친구 리스트를 확인
 */
export const getFriends = async () => {
  try {
    const response = await GET(`/users/me/friends`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 내가 보낸 친구 요청 리스트를 확인
 */
export const getFriendRequestedList = async () => {
  try {
    const response = await GET(`/users/me/friends/request`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 나에게 온 친구 요청 리스트를 확인
 */
export const getFriendReceivedList = async () => {
  try {
    const response = await GET(`/users/me/friends/received`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 나에게 온 친구 요청 수락/거절
 */
export const answerFriendRequest = async (friendId: number, answer: string) => {
  try {
    const response = (answer === 'accept')
      ? await PATCH_NODATA(`/users/me/friends/${friendId}/accept`)
      : await DELETE(`/users/me/friends/${friendId}/deny`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 내가 구독하는 사람 리스트를 확인
 */
export const getFollowing = async () => {
  try {
    const response = await GET(`/users/me/follows/following`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 나를 구독하는 사람 리스트를 확인
 */
export const getFollowers = async () => {
  try {
    const response = await GET(`/users/me/follows/follower`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}