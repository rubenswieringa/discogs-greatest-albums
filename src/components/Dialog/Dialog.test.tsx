import React from 'react';
import { shallow, render } from 'enzyme';

import { Dialog } from './Dialog';

describe('Dialog component', () => {
  it('is a <dialog>', () => {
    const dialog = render(<Dialog>I am a dialog</Dialog>);
    expect(dialog.is('dialog')).toBe(true);
  });

  it('displays provided text', () => {
    const text = 'I am a dialog';
    const dialog = shallow(<Dialog>{text}</Dialog>);
    expect(dialog).toHaveText(text);
  });
});
