export const today = (option?: string) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[now.getDay()];

  return option === 'datepicker'
    ? `${year}-${month}-${date}`
    : `${month}월 ${date}일 ${dayOfWeek}요일`
}