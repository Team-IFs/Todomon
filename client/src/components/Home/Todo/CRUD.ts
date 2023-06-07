import { setDataLocalStorage } from '../../../utils/localstorage'
import { CategoryItem, SubItem } from '../../../types/todo'

export const AddNewItem = (newItemContent: string, categoryId: string, subItems: SubItem[], replaceSubItems: any) => {
  let newItem = {
    categoryId: categoryId,
    id: `${categoryId}-${subItems.length}`,
    content: newItemContent,
    isDone: false,
  }
  subItems.push(newItem)
  replaceSubItems(subItems);
}

