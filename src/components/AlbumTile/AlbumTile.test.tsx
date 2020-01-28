import React from 'react';
import faker from 'faker';
import { shallow, mount } from 'enzyme';

import { Album } from '@state/album';

import { AlbumTile } from './AlbumTile';

describe('AlbumTile component', () => {
  const album: Album = { id: 1, name: 'Reign In Blood', image: faker.image.abstract() };

  it('is a <li>', () => {
    const listItem = shallow(<AlbumTile album={album} />);
    expect(listItem.is('li')).toBe(true);
  });

  it('has album name as a tooltip', () => {
    const listItem = shallow(<AlbumTile album={album} />);
    expect(listItem.prop('title')).toBe(album.name);
  });

  it('includes album-cover image', () => {
    const listItem = mount(<AlbumTile album={album} />);
    expect(listItem).toContainExactlyOneMatchingElement('img');

    const image = listItem.find('img');
    expect(image.prop('src')).toBe(album.image);
    expect(image.prop('alt')).toBe(`Album artwork for ${album.name}`);
  });
});
