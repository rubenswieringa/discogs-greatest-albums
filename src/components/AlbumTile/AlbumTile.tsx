import React from 'react';

import { Album } from '@state/album';

interface Props {
  album: Album;
}

export const AlbumTile: React.FunctionComponent<Props> = ({ album }) => {
  return <li>{album.name}</li>;
};
