import { useEffect } from 'react';
import { isServer } from '../constants/isServer';

export const useLocalStorageSync = <State>(state: State, key?: string) => {
  useEffect(() => {
    if (key && !isServer) {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state, key]);
};
