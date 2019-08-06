import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Routes from './routes';

describe('Application', () => {
  it('renders without crashing', () => {
    const container = document.createElement('div');
    const store = createStore(() => ({ albums: { albums: [] } }));

    ReactDOM.render(
      <Provider store={store}>
        <Routes />
      </Provider>,
      container,
    );

    ReactDOM.unmountComponentAtNode(container);
  });
});
