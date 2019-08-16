import { Album } from '@state/album';

export const albumEquals = (a: Album | null, b: Album | null) => {
  if (!a || !b) {
    return !!a === !!b;
  }
  return a.id == b.id;
};
