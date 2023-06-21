import { EventInput } from '@fullcalendar/core'
import { static_items } from './../Todo/data'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// export const INITIAL_EVENTS: EventInput[] = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: todayStr
//   },
// ]

export const INITIAL_EVENTS: EventInput[] = [];
static_items.map((item) => {
  item.subItems.map((subItem) => {
    INITIAL_EVENTS.push({
      id: createEventId(),
      title: subItem.content,
      start: todayStr,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: '#000'
    })
  })
})

export function createEventId() {
  return String(eventGuid++)
}