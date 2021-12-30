This is a simple state/store utility for React based on Hooks, Context API and localStorage synchronization (optional). Safe to use with SSR.
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

```ts
import { createContextStore } from 'react-create-context';

const initialState: State = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'example':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const [
  ContextStoreProvider,
  useContextStore,
  useContextStoreDispatch,
] = createContextStore<State>(reducer, initialState); // you can pass localeStorage key as a third argument to sync with localStorage

const contextStoreActions = {
  example: (payload) => ({ type: 'example', payload }),
};

export {
  ContextStoreProvider,
  useContextStore,
  useContextStoreDispatch,
  contextStoreActions,
};

```

Example of createContextState utility: 

```ts
import { createContextState } from 'react-create-context';

const initialState: State = {};

const [
  ContextStateProvider,
  useContextState,
  useContextSetState
] = createContextState<State>(initialState); // you can pass localeStorage key as a second argument to sync with localStorage

export {
  ContextStateProvider,
  useContextState,
  useContextSetState
};

```

You can find more examples in this [folder](https://github.com/ivan-kobzar/react-create-context/blob/main/example/index.tsx).