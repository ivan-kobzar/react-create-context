import React, {
  createContext as reactCreateContext,
  Dispatch,
  FC,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';

export const createContextStore = <State, Actions>(
  storeReducer: Reducer<State, Actions>,
  initialState: State,
  key?: string
): [FC, () => State, () => Dispatch<Actions>] => {
  const DispatchContext = reactCreateContext({});
  const StoreContext = reactCreateContext(initialState);

  const localStorageState: string | null = key
    ? localStorage.getItem(key)
    : null;

  initialState = localStorageState
    ? JSON.parse(localStorageState)
    : initialState;

  const StoreProvider: FC = ({ children }) => {
    const [store, dispatch] = useReducer(storeReducer, initialState);

    useEffect(() => {
      if (key) {
        localStorage.setItem(key, JSON.stringify(store));
      }
    }, [store]);

    return (
      <DispatchContext.Provider value={dispatch}>
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
      </DispatchContext.Provider>
    );
  };

  const useDispatch = () => useContext(DispatchContext) as Dispatch<Actions>;
  const useStore = () => useContext(StoreContext);

  return [StoreProvider, useStore, useDispatch];
};
