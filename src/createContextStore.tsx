import React, {
  createContext as reactCreateContext,
  Dispatch,
  FC,
  Reducer,
  useContext,
  useReducer,
} from 'react';
import { useLocalStorageSync } from './hooks/useLocalStorageSync';
import { getFromLocalStorage } from './utils/getFromLocalStorage';

export const createContextStore = <State, Actions>(
  storeReducer: Reducer<State, Actions>,
  initialState: State,
  key?: string
): [FC, () => State, () => Dispatch<Actions>] => {
  const localStorageState = getFromLocalStorage<State>(key);
  const initialOrSavedState = localStorageState ?? initialState;

  const DispatchContext = reactCreateContext({});
  const StoreContext = reactCreateContext(initialOrSavedState);

  const StoreProvider: FC = ({ children }) => {
    const [store, dispatch] = useReducer(storeReducer, initialOrSavedState);

    useLocalStorageSync(store, key);

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
