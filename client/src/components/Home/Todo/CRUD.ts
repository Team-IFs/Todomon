import { today } from './../../../utils/today';
import { SubItem } from '../../../types/todo'
import { getTodaysTodo } from '../../../utils/axios/todo'
import { TodoList } from '../../../recoil/atoms/atoms'
import { useRecoilState } from 'recoil'

// TODO: inner 에서 사용중, 여기서 바로 만들지 말고, 서버에서 요청하는 것만 전달해서 집어넣은 뒤에 다시 불러오는걸 받는걸로 하기.
export const AddNewItem = (newItemContent: string, categoryId: number, subItems: SubItem[], replaceSubItems: any) => {
  let newItem: SubItem = {
    categoryId: categoryId,
    done: false,
    endAt: today('todoRequest'),
    repeated: null,
    startAt: today('todoRequest'),
    idx: 0,
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