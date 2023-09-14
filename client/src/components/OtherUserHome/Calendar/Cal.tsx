import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { DateSelectArg, EventContentArg, EventInput } from '@fullcalendar/core'
import { getCookie } from '../../../utils/cookies/cookies';
import { getMontlyTodo } from '../../../utils/axios/todo';
import { today } from '../../../utils/today';
import { CategoryItem, SubItem } from '../../../types/todo';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil';
import { CurrentClickedUser, CurrentDay } from '../../../recoil/atoms/atoms';

const Todo = styled.div<{ color: string }>({
  display: 'flex',
  alignItems: 'center',
  accentColor: `${(props: any) => props.color}`
})

let eventGuid = 0;

export const EVENTS: EventInput[] = [];

export const createEventId = () => {
  return String(eventGuid++)
}

const Cal = () => {
  let calendarRef: any = null;
  const [events, setEvents] = useState<EventInput[]>([]);
  const [currentYear, setCurrentYear] = useState(today('year'));
  const [currentMonth, setCurrentMonth] = useState(today('month'));
  const [, setCurrentDay] = useRecoilState(CurrentDay);
  const [currentClickedUser] = useRecoilState(CurrentClickedUser);


  const isCookieExists = getCookie('accessJwtToken') ? true : false;


  /**  달력에서 날짜 클릭 */
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setCurrentDay(selectInfo.startStr)
  }

  let monthly: any[] = [];

  useEffect(() => {
    console.log('currentClickedUser.memberId: ' + currentClickedUser.memberId)
    isCookieExists && getMontlyTodo(currentYear, currentMonth, currentClickedUser.memberId).then((res: any) => {
      if (res) {
        monthly = res.content;
        const newEvents: EventInput[] = [];
        monthly.forEach((daily) => {
          daily.categoryTodos.forEach((item: CategoryItem) => {
            item.todos.forEach((subItem: SubItem) => {
              newEvents.push({
                id: createEventId(),
                title: subItem.todoName,
                start: subItem.startAt,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              })
            })
          })
        })
        setEvents(newEvents);
      }
    });
  }, [currentMonth]);

  /** prev, next 버튼 클릭에 따라 현재 월을 변경하는 함수 */
  const changeMonth = (addingMonth: string) => {
    let newMonth = Number(currentMonth), newYear = Number(currentYear);

    const isPrev = addingMonth === 'prev';
    const isNext = addingMonth === 'next';

    newMonth = (newMonth - 1 + (isPrev ? 12 : isNext ? 1 : 0)) % 12 + 1;
    newYear += (isPrev && newMonth === 12) || (isNext && newMonth === 1) ? 1 : 0;
    
    (newYear !== Number(currentYear)) && setCurrentYear(newYear.toString());
    setCurrentMonth(newMonth.toString()); 

  }

  const handlePrevClick = () => {
    if (calendarRef) {
      calendarRef.getApi().prev();
      changeMonth('prev');
    }
  };

  const handleNextClick = () => {
    if (calendarRef) {
      calendarRef.getApi().next();
      changeMonth('next');
    }
  };

  const customButtons = {
    customPrevButton: {
      text: '<',
      click: handlePrevClick,
    },
    customNextButton: {
      text: '>',
      click: handleNextClick,
    },
  };

  return (
    <div>
      <FullCalendar
        ref={(ref) => (calendarRef = ref)}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        customButtons={customButtons}
        headerToolbar={{
          right: 'customPrevButton today customNextButton'
        }}
        dayMaxEvents={true}
        weekends={true}
        locale='ko'
        events={events}
        eventContent={renderEventContent}
        selectable={true}
        select={handleDateSelect}
      />
    </div>
  )
}

/** 달력안에 표시할 투두 1개 */
const renderEventContent = (eventContent: EventContentArg) => {
  return (
    <Todo color={eventContent.textColor}>
      <input type='checkbox'></input>
      <div>{eventContent.event.title}</div>
    </Todo>
  )
}

export default Cal;