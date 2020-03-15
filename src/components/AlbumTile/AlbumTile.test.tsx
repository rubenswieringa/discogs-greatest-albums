import React from 'react';
import faker from 'faker';
import { shallow, mount } from 'enzyme';

import { Album } from '@state/album';

import { AlbumTile } from './AlbumTile';

describe('AlbumTile component', () => {
  const ALBUM: Album = { id: 1, name: 'Reign In Blood', image: faker.image.abstract() };

  it('is a <li>', () => {
    const listItem = shallow(<AlbumTile album={ALBUM} />);
    expect(listItem.is('li')).toBe(true);
  });

  it('has album name as a tooltip', () => {
    const listItem = shallow(<AlbumTile album={ALBUM} />);
    expect(listItem.prop('title')).toBe(ALBUM.name);
  });

  it('includes album-cover image', () => {
    const listItem = mount(<AlbumTile album={ALBUM} />);
    expect(listItem).toContainExactlyOneMatchingElement('img');

    const image = listItem.find('img');
    expect(image.prop('src')).toBe(ALBUM.image);
    expect(image.prop('alt')).toBe(`Album artwork for ${ALBUM.name}`);
  });

  it('includes remove-button', () => {
    const listItem = mount(<AlbumTile album={ALBUM} />);
    expect(listItem).toContainExactlyOneMatchingElement('button');

    const button = listItem.find('button');
    expect(button).toHaveText('Remove');
  });

  it('invokes remove-handler on remove-button click', () => {
    const callback = jest.fn();
    const listItem = shallow(<AlbumTile album={ALBUM} remove={callback} />);

    const button = listItem.find('button');
    if (!button) return;

    const event = new MouseEvent('click');
    event.preventDefault = jest.fn();
    button.simulate('click', event);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(ALBUM);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
