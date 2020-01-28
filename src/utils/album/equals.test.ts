import { albumEquals as equals } from './equals';

describe('albumEquals', () => {
  it('considers falsy values equal', () => {
    expect(equals(null, null)).toBe(true);
  });

  it('compares albums by ID', () => {
    expect(equals({ id: 1, name: 'Peach', image: 'x' }, { id: 1, name: 'Bay Dream', image: 'x' })).toBe(true);
    expect(equals({ id: 1, name: 'Peach', image: 'y' }, { id: 1, name: 'Peach', image: 'z' })).toBe(true);
    expect(equals({ id: 1, name: 'Peach', image: '' }, { id: 2, name: 'Peach', image: '' })).toBe(false);
  });

  it('compares album-IDs by regular (non-strict) equality', () => {
    expect(equals({ id: 1, name: 'Peach', image: '' }, { id: '1', name: 'Peach', image: '' })).toBe(true);
  });
});
