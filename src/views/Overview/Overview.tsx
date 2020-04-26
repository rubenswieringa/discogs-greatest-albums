import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_ALBUMS, LoadAlbumsAction, RemoveAlbumAction, REMOVE_ALBUM } from '@actions/album';
import { AlbumTile } from '@components/AlbumTile';
import { State, Album } from '@state/index';
import {
  extendableStyledComponentAttrs,
  ExtendableStyledComponentProps,
  styledLayoutChild,
} from '@utils/styled-components';

import { AddAlbumButton } from './AddAlbumButton';
import { OverviewLayout as Layout } from './layout';

const Component: React.FunctionComponent<ExtendableStyledComponentProps> = ({ className }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<LoadAlbumsAction>({ type: LOAD_ALBUMS });
  }, []);

  const remove = useCallback(
    (album: Album) => {
      dispatch<RemoveAlbumAction>({ type: REMOVE_ALBUM, album });
      close();
    },
    [close],
  );

  const albums = useSelector(({ albums }: State) => albums.list);

  return (
    <Layout {...extendableStyledComponentAttrs(className)}>
      {!albums.length && <p>…haven’t been made yet?</p>}
      <ul>
        {!!albums.length &&
          albums.map(album => <AlbumTile key={album.id} album={album} remove={(album: Album) => remove(album)} />)}
        <AddAlbumButton to="/add">{albums.length ? 'Add another album' : 'Add your first album'}</AddAlbumButton>
      </ul>
    </Layout>
  );
};

export const Overview = styledLayoutChild(Component);
