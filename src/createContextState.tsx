import React, {
  createContext as reactCreateContext,
  SetStateAction,
  Dispatch,
  FC,
  useContext,
  useState,
} from 'react';
import { useLocalStorageSync } from './hooks/useLocalStorageSync';
import { getFromLocalStorage } from './utils/getFromLocalStorage';

export const createContextState = <State,>(
  initialState: State,
  key?: string
): [FC, () => State, () => Dispatch<SetStateAction<State>>] => {
  const localStorageState = getFromLocalStorage<State>(key);
  const initialOrSavedState = localStorageState ?? initialState;

  const SetStateContext = reactCreateContext({});
  const StateContext = reactCreateContext(initialOrSavedState);

  const StateProvider: FC = ({ children }) => {
    const [state, setState] = useState(initialOrSavedState);

    useLocalStorageSync(state, key);

    return (
      <SetStateContext.Provider value={setState}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </SetStateContext.Provider>
    );
  };

  const useContextSetState = () =>
    useContext(SetStateContext) as Dispatch<SetStateAction<State>>;

  const useContextState = () => useContext<State>(StateContext);

  return [StateProvider, useContextState, useContextSetState];
};
