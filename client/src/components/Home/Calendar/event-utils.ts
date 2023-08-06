import { EventInput } from '@fullcalendar/core'
import { static_items, AtomItems } from '../Todo/data'
import { getMontlyTodo } from '../../../utils/axios/todo';
import { CategoryItem, SubItem } from '../../../types/todo';
import { getCookie } from '../../../utils/cookies/cookies';
import { today } from '../../../utils/today';

let eventGuid = 0;


const isCookieExists = getCookie('accessJwtToken') ? true : false;

//TODO: getMontlyTodo 를 현재 선택된 년-월로 해야함
const month = isCookieExists
  ? getMontlyTodo(today('year'), today('month'))
  : new Promise((resolve) => {
    resolve('로그인이 필요합니다');
  });

let monthly: any[] = [];
export const INITIAL_EVENTS: EventInput[] =
  isCookieExists ? [
    month.then((res: any) => {
      if (res) {
        console.log(res.content);
        monthly = res.content;
        // console.log(monthly)
        monthly.map((daily) => {
          // console.log(daily);
          daily.categoryTodos.map((item: CategoryItem) => {
            item.todos.map((subItem: SubItem) => {
              INITIAL_EVENTS.push({
                id: createEventId(),
                title: subItem.todoName,
                start: subItem.startAt,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              })
            })
          })
        })
      }
    })
  ] : [];


export function createEventId() {
  return String(eventGuid++)
}