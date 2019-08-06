import { extendableStyledComponentAttrs } from './extendable';

describe('extendableStyledComponentAttrs()', () => {
  it('wraps a CSS class-name in an object', () => {
    const className = 'my-class-name';
    expect(extendableStyledComponentAttrs(className)).toEqual({ className });
  });

  it('ignores undefined', () => {
    expect(extendableStyledComponentAttrs(undefined)).toEqual({});
  });
});
