import React from 'react';
import faker from 'faker';
import { mount, shallow } from 'enzyme';

import { Album } from '@state/album';

import { AlbumListItem } from './AlbumListItem';

describe('AlbumListItem component', () => {
  const album: Album = { id: 1, name: 'Reign In Blood', image: faker.image.abstract() };

  it('is a <li>', () => {
    const listItem = shallow(<AlbumListItem album={album} />);
    expect(listItem.is('li')).toBe(true);
  });

  it('displays album name', () => {
    const listItem = shallow(<AlbumListItem album={album} />);
    expect(listItem).toHaveText(album.name);
  });

  it('includes album-cover image', () => {
    const listItem = mount(<AlbumListItem album={album} />);
    expect(listItem).toContainExactlyOneMatchingElement('img');

    const image = listItem.find('img');
    expect(image.prop('src')).toBe(album.image);
    expect(image.prop('alt')).toBe(`Album artwork for ${album.name}`);
  });

  it('invokes onClick when clicked', () => {
    const callback = jest.fn();
    const listItem = shallow(<AlbumListItem album={album} onClick={callback} />);
    const event = new MouseEvent('click');
    event.preventDefault = jest.fn();
    listItem.simulate('click', event);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(album);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
