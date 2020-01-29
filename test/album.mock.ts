import * as Factory from 'factory.ts';
import faker from 'faker';

import { Album } from '@state/album';

const ALBUM_NAMES = ['Culture Abuse - Peach', 'Amyl & The Sniffers - Giddy up', 'Slayer - Reign in blood'];

export const albumFactory = Factory.Sync.makeFactory<Album>({
  id: Factory.each(i => i),
  name: Factory.each(i => ALBUM_NAMES[i] || faker.random.words()),
  image: faker.random.image(),
});
