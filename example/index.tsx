import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createContextState } from '../src';

const [ThemeProvider, useTheme, useSetTheme] = createContextState({theme: 'dark'});

const ThemeToggle = () => {
  const { theme } = useTheme();
  const setTheme = useSetTheme();

  const isDarkTheme = theme === 'dark';

  return (
    <button onClick={() => setTheme({theme: isDarkTheme ? 'white': 'dark'})}>{isDarkTheme ? <>🌞</> : <>🌑</>}</button>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {/* TODO: add auth example with createContextStore*/}
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
