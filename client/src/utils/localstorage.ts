export const setDataLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
  return;
}

export const getDataLocalStorage = (key: string) => {
  let localData = localStorage.getItem(key)
  if (!localData) return null;
  return JSON.parse(localData);
}