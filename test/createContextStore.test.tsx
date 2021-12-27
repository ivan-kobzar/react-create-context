import * as React from 'react';
import * as ReactDOM from 'react-dom';

// TODO: add tests
describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<h1>Hello world!</h1>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
