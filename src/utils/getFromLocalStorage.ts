import { isServer } from '../constants/isServer';

export const getFromLocalStorage = <State>(key?: string): State | null => {
  if (!key || isServer) return null;

  const value = window.localStorage.getItem(key);

  if (value) return JSON.parse(value);

  return null;
};
