import React, { useCallback, SyntheticEvent } from 'react';

import { Album } from '@state/album';

interface Props {
  album: Album;
  select?: (album: Album) => void | any;
}

export const AlbumListItem: React.FunctionComponent<Props> = ({ album, select }) => {
  const invokeSelectHandler = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      select && select(album);
    },
    [select, album],
  );

  return (
    <li onClick={event => invokeSelectHandler(event)}>
      <img src={album.image} alt={`Album artwork for ${album.name}`} />
      <p>{album.name}</p>
    </li>
  );
};
