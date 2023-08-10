export const today = (option?: string) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[now.getDay()];
  switch (option) {
    case 'ymd': // YYYY-M-D
      return `${year}-${month}-${date}`;

    case 'fymd':  // YYYY-MM-DD
      return now.toISOString().replace(/T.*$/, '')

    case 'year':
      return `${year}`;

    case 'month':
      return `${month}`;

    default:  // 7월 3일 월요일
      return `${month}월 ${date}일 ${dayOfWeek}요일`
  }
}

// YYYY-MM-DD
export const formatDate = (dateString: string) => {
  if (dateString.length === 10) return dateString;
  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 10);
  return formattedDate;
}

export const DateString = (dateString: string) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const date = new Date(dateString);
  // const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];

  const formattedDate = `${month}월 ${day}일 ${dayOfWeek}요일`;

  return formattedDate;
}