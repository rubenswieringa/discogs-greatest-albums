import { albumEquals as equals } from './equals';

describe('albumEquals', () => {
  it('considers falsy values equal', () => {
    expect(equals(null, null)).toBe(true);
  });

  it('compares albums by ID', () => {
    expect(equals({ id: 1, name: 'Peach' }, { id: 1, name: 'Bay Dream' })).toBe(true);
    expect(equals({ id: 1, name: 'Peach' }, { id: 2, name: 'Peach' })).toBe(false);
  });

  it('compares album-IDs by regular (non-strict) equality', () => {
    expect(equals({ id: 1, name: 'Peach' }, { id: '1', name: 'Peach' })).toBe(true);
  });
});
