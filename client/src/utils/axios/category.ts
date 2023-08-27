import { GET } from './axios'

/**
 * 특정 유저의 카테고리를 전부 가져오는 함수
 */
export const getCategories = async () => {
  try {
    const response = await GET(`/users/me/categories`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}