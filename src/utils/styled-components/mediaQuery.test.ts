import { mediaQuery } from './mediaQuery';

describe('mediaQuery()', () => {
  it('creates media queries with single parameter', () => {
    expect(mediaQuery({ minWidth: '100px' })).toBe('@media (min-width: 100px)');
  });

  it('assumes numeric values are in pixels', () => {
    expect(mediaQuery({ minWidth: 100 })).toBe('@media (min-width: 100px)');
  });

  it('creates media queries with value-less parameters', () => {
    expect(mediaQuery({ hover: true })).toBe('@media (hover)');
  });

  it('negates value-less parameters', () => {
    expect(mediaQuery({ hover: false })).toBe('@media (not(hover))');
  });

  it('creates media queries with multiple parameters', () => {
    expect(mediaQuery({ minWidth: '100px', maxWidth: '200rem', hover: false })).toBe(
      '@media (min-width: 100px) and (max-width: 200rem) and (not(hover))',
    );
  });
});
