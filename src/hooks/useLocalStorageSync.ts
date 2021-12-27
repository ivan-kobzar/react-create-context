import { useEffect } from 'react';

export const useLocalStorageSync = <State>(state: State, key?: string) => {
  useEffect(() => {
    if (key) {
      window?.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state, key]);
};
