/** 응답으로 받아서 필요한 타입으로 변경한 카테고리 아이템 interface */
export interface CategoryItemWithoutTodomon {
  categoryColor: string,
  categoryId: number,
  categoryName: string,
  hide: boolean,
  scope: number,
  idx: number
}

/** 응답으로 받아서 필요한 타입으로 변경한 카테고리 내부 할일 아이템 interface */
export interface SubItem {
  categoryId: number,
  done: boolean,
  endAt: string,
  idx: number,
  repeated: string | null,
  startAt: string,
  todoId: number,
  todoName: string
}

/** 응답으로 받아서 필요한 타입으로 변경한 카테고리 아이템 interface */
export interface CategoryItem extends CategoryItemWithoutTodomon {
  todos: SubItem[]
}