export function adjustState(state: any, key: string | string[], value: any) {
  const clone = { ...state };

  if (!key || !key.length) {
    return clone;
  }

  const path = Array.isArray(key) ? key : key.split('.');

  path.reduce((part, property, index, { length }) => {
    return (part[property] = index === length - 1 ? value : { ...part[property] });
  }, clone);

  return clone;
}
