export interface CategoryItem {
  id: string,
  content: string,
  color: string,
  subItems: SubItem[]
}

export interface SubItem {
  categoryId: string,
  id: string,
  content: string,
  isDone: boolean
}