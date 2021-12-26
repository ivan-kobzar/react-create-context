import React, {
  createContext as reactCreateContext,
  SetStateAction,
  Dispatch,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';

export const createContextState = <State,>(
  initialState: State,
  key?: string
): [FC, () => State, () => Dispatch<SetStateAction<State>>] => {
  const SetStateContext = reactCreateContext({});
  const StateContext = reactCreateContext(initialState);

  const localStorageState: string | null = key
    ? localStorage.getItem(key)
    : null;
  initialState = localStorageState
    ? JSON.parse(localStorageState)
    : initialState;

  const StateProvider: FC = ({ children }) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
      if (key) {
        localStorage.setItem(key, JSON.stringify(state));
      }
    }, [state]);

    return (
      <SetStateContext.Provider value={setState}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </SetStateContext.Provider>
    );
  };

  const useContextSetState = () =>
    useContext(SetStateContext) as Dispatch<SetStateAction<State>>;
  const useContextState = () => useContext(StateContext);

  return [StateProvider, useContextState, useContextSetState];
};
