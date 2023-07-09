import { setDataLocalStorage } from '../../../utils/localstorage'
import { CategoryItem, SubItem } from '../../../types/todo'
import { POST } from '../../../utils/axios/axios'
import { getTodaysTodo } from '../../../utils/axios/todo'
import { TodoList } from '../../../recoil/atoms/atoms'
import { useRecoilState } from 'recoil'

export const AddNewItem = (newItemContent: string, categoryId: number, subItems: SubItem[], replaceSubItems: any) => {
  let newItem: SubItem = {
    categoryId: categoryId,
    done: false,
    endAt: '2023-07-03',
    repeated: null,
    startAt: '2023-07-03',
    // todoId: `${categoryId}-${subItems.length}`,
    todoId: subItems.length,
    todoName: newItemContent
  }
  subItems.push(newItem)
  replaceSubItems(subItems);
}

export const ReadItem = () => {
  console.log('read item 실행')
  const [, setTodolist] = useRecoilState(TodoList);
  const todaysTodo = getTodaysTodo();
  todaysTodo.then((res) => {
    if (res) {
      setTodolist(res.content)
    }
  });
}