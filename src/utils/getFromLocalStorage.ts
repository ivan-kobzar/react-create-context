export const getFromLocalStorage = <State>(key?: string): State | null => {
  if (!key) return null;

  const value = window?.localStorage.getItem(key);

  if (value) return JSON.parse(value);

  return null;
};
