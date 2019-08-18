import React, { useCallback, SyntheticEvent } from 'react';

import { Album } from '@state/album';

interface Props {
  album: Album;
  onClick?: (album: Album) => void | any;
}

export const AlbumListItem: React.FunctionComponent<Props> = ({ album, onClick }) => {
  const invokeClickHandler = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      onClick && onClick(album);
    },
    [onClick, album],
  );

  return <li onClick={event => invokeClickHandler(event)}>{album.name}</li>;
};
