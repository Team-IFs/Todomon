export const today = (option?: string) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[now.getDay()];

  switch (option) {
    case 'datepicker': // 2023-7-3
      return `${year}-${month}-${date}`

    case 'todoRequest':  // 2023-07-03
      const TodoFormat =
        `${year}-${('00' + month.toString()).slice(-2)}-${('00' + date.toString()).slice(-2)}`
      return TodoFormat

    default:  // 7월 3일 월요일
      return `${month}월 ${date}일 ${dayOfWeek}요일`
  }
}