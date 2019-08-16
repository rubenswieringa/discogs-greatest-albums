import { adjustState as adjust } from './adjust';

describe('adjustState()', () => {
  it('writes properties', () => {
    const value = 'value';
    const state = adjust({}, 'a', value);

    expect(state.a).toBe(value);
  });

  it('writes deep properties', () => {
    const value = 'value';
    const state = adjust({}, 'xx.yy.zz', value);

    expect(state.xx).toBeDefined();
    expect(state.xx.yy).toBeDefined();
    expect(state.xx.yy.zz).toBe(value);
  });

  it('writes deep properties with key as Array', () => {
    const value = 'value';
    const state = adjust({}, ['xx', 'yy', 'zz'], value);

    expect(state.xx).toBeDefined();
    expect(state.xx.yy).toBeDefined();
    expect(state.xx.yy.zz).toBe(value);
  });

  it('leaves existing properties alone', () => {
    const oldState = { a: { b: 'bee', c: 'cee' } };
    const newState = adjust(oldState, 'a.b', 'new value');

    expect(newState.a.c).toBe(oldState.a.c);
  });

  it('returns a copied state', () => {
    const input = { a: { b: 'c' }, x: { y: 'z' } };
    const output = adjust(input, 'x.y', '');

    expect(output).not.toBe(input);
  });

  it('ignores empty keys', () => {
    const input = { a: 'b' };
    const output = adjust(input, '', '');

    expect(output).toEqual(input);
    expect(output).not.toBe(input);
  });
});
