import React from 'react';
import { mount, shallow } from 'enzyme';

import { albumFactory } from '@test/album.mock';

import { AlbumListItem } from './AlbumListItem';

describe('AlbumListItem component', () => {
  const ALBUM = albumFactory.build();

  it('is a <li>', () => {
    const listItem = shallow(<AlbumListItem album={ALBUM} />);
    expect(listItem.is('li')).toBe(true);
  });

  it('displays album name', () => {
    const listItem = shallow(<AlbumListItem album={ALBUM} />);
    expect(listItem).toHaveText(ALBUM.name);
  });

  it('includes album-cover image', () => {
    const listItem = mount(<AlbumListItem album={ALBUM} />);
    expect(listItem).toContainExactlyOneMatchingElement('img');

    const image = listItem.find('img');
    expect(image.prop('src')).toBe(ALBUM.image);
    expect(image.prop('alt')).toBe(`Album artwork for ${ALBUM.name}`);
  });

  it('invokes onClick when clicked', () => {
    const callback = jest.fn();
    const listItem = shallow(<AlbumListItem album={ALBUM} onClick={callback} />);
    const event = new MouseEvent('click');
    event.preventDefault = jest.fn();
    listItem.simulate('click', event);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(ALBUM);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
