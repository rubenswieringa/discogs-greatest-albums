import React, { useCallback, SyntheticEvent } from 'react';

import { Album } from '@state/album';

interface Props {
  album: Album;
  remove?: (album: Album) => void | any;
}

export const AlbumTile: React.FunctionComponent<Props> = ({ album, remove }) => {
  const invokeRemoveHandler = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      remove && remove(album);
    },
    [remove, album],
  );

  return (
    <li title={album.name}>
      <img src={album.image} alt={`Album artwork for ${album.name}`} />
      <button onClick={event => invokeRemoveHandler(event)}>Remove</button>
    </li>
  );
};
