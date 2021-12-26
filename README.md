This is a simple state/store utility for React based on Hooks, Context API and localStorage synchronization (optional)
## Main Features

- createContextStore based on Flux architecture (useReducer)
- createContextState based on React state (useState)

## Installation

With yarn:

```txt
yarn add react-create-context
```

Or npm:

```txt
npm install react-create-context
```

## Examples

Example of createContextStore utility: 

```js
import { createContextStore } from 'react-create-context';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'action':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const [
  ContextStoreProvider,
  useContextStore,
  useContextStoreDispatch,
] = createContextStore(reducer, initialState); // you can pass localeStorage key as a third argument to sync with localStorage

const contextStoreActions = {
  action: (payload) => ({ type: 'action', payload }),
};

export {
  ContextStoreProvider,
  useContextStore,
  useContextStoreDispatch,
  contextStoreActions,
};

```

Example of createContextState utility: 

```js
import { createContextState } from 'react-create-context';

const initialState = {};

const [
  ContextStateProvider,
  useContextState,
  useContextSetState
] = createContextState(initialState); // you can pass localeStorage key as a second argument to sync with localStorage

export {
  ContextStateProvider,
  useContextState,
  useContextSetState
};

```