import React from 'react';
import ReactDOM from 'react-dom';

import { Dialog } from './Dialog';

describe('Dialog component', () => {
  it('renders correctly', () => {
    const container = document.createElement('div');
    const text = 'Ali Baba and the forty thieves';
    ReactDOM.render(<Dialog>{text}</Dialog>, container);

    const element = container.firstChild as HTMLElement;
    expect(element.tagName.toLowerCase()).toBe('dialog');
    expect(element.innerHTML).toBe(text);

    ReactDOM.unmountComponentAtNode(container);
  });
});
