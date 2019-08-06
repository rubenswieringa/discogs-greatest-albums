import { albumEquals as equals } from './equals';

describe('albumEquals', () => {
  it('considers falsy values equal', () => {
    expect(equals(null, null)).toBe(true);
  });

  it('compares albums by name', () => {
    expect(equals({ name: 'Peach' }, { name: 'Peach' })).toBe(true);
    expect(equals({ name: 'Peach' }, { name: 'Bay Dream' })).toBe(false);
  });
});
