import React from 'react';

import { Album } from '@state/album';

interface Props {
  album: Album;
}

export const AlbumTile: React.FunctionComponent<Props> = ({ album }) => {
  return (
    <li title={album.name}>
      <img src={album.image} alt={`Album artwork for ${album.name}`} />
    </li>
  );
};
