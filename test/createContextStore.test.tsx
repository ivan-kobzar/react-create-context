import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createContextState } from '../src';

const [ThemeProvider, useTheme, useSetTheme] = createContextState({
  theme: 'dark',
});

const ThemeToggle = () => {
  const { theme } = useTheme();
  const setTheme = useSetTheme();

  const isDarkTheme = theme === 'dark';

  return (
    <>
      <h1>{isDarkTheme ? 'Dark' : 'Light'}</h1>
      <button
        onClick={() => setTheme({ theme: isDarkTheme ? 'white' : 'dark' })}
      >
        {isDarkTheme ? <>🌞</> : <>🌑</>}
      </button>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
};

// TODO: cover local storage
describe('it', () => {
  it('renders without crashing', () => {
    render(<App />);

    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('renders with state changes', () => {
    render(<App />);

    expect(screen.getByText('Dark')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(screen.queryByText('Dark')).not.toBeInTheDocument();

    expect(screen.getByText('Light')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Dark')).toBeInTheDocument();
  });
});
