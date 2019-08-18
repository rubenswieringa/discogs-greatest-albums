import React from 'react';
import { shallow } from 'enzyme';

import { Album } from '@state/album';

import { AlbumTile } from './AlbumTile';

describe('AlbumTile component', () => {
  const album: Album = { id: 1, name: 'Reign In Blood' };

  it('is a <li>', () => {
    const listItem = shallow(<AlbumTile album={album} />);
    expect(listItem.is('li')).toBe(true);
  });

  it('displays album name', () => {
    const listItem = shallow(<AlbumTile album={album} />);
    expect(listItem).toHaveText(album.name);
  });
});
