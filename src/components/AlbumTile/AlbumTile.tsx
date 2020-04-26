import React, { useCallback, SyntheticEvent } from 'react';

import { Album } from '@state/album';

import { AlbumTileLayout as Layout, AlbumTileRemoveButton as RemoveButton } from './layout';
import {
  styledLayoutChild,
  ExtendableStyledComponentProps,
  extendableStyledComponentAttrs,
} from '@utils/styled-components';

interface Props extends ExtendableStyledComponentProps {
  album: Album;
  remove?: (album: Album) => void | any;
}

const Component: React.FunctionComponent<Props> = ({ album, className, remove }) => {
  const invokeRemoveHandler = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      remove && remove(album);
    },
    [remove, album],
  );

  return (
    <Layout title={album.name} {...extendableStyledComponentAttrs(className)}>
      <img src={album.image} alt={`Album artwork for ${album.name}`} />
      <RemoveButton onClick={event => invokeRemoveHandler(event)}>Remove {album.name}</RemoveButton>
    </Layout>
  );
};

export const AlbumTile = styledLayoutChild(Component);
