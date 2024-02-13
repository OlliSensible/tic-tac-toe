export const setLocalStorageData = (key, value, parser = false) => {
  const serializedState = parser ? JSON.stringify(value) : value;
  localStorage.setItem(key, serializedState);
};
  
export const getLocalStorageData = key => {
  const serializedState = localStorage.getItem(key);
  return serializedState === null ? undefined : JSON.parse(serializedState);
};