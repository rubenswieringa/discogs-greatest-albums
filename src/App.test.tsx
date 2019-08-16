import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { State } from '@state/index';

import Routes from './routes';

describe('Application', () => {
  it('renders without crashing', () => {
    const container = document.createElement('div');
    const state: State = { albums: { list: [] } };
    const store = createStore(() => state);

    ReactDOM.render(
      <Provider store={store}>
        <Routes />
      </Provider>,
      container,
    );

    ReactDOM.unmountComponentAtNode(container);
  });
});
