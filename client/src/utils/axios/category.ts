import { CategoryItemWithoutTodomon } from '../../types/todo';
import { DELETE, GET, PATCH } from './axios'

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

/**
 * 선택한 카테고리 설정을 업데이트 하는 함수
 */
export const updateCategory = async (category: CategoryItemWithoutTodomon) => {
  const params = { ...category };
  try {
    const response = await PATCH(`/users/me/categories/${category.categoryId}`, params);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 선택한 카테고리를 삭제 하는 함수
 */
export const deleteCategory = async (categoryId: number) => {
  try {
    await DELETE(`/users/me/categories/${categoryId}`);
    return 'SUCCESS';
  } catch (error) {
    console.error(error);
    return 'FAIL';
  }
}