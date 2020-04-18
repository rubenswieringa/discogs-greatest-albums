import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_ALBUMS, LoadAlbumsAction, RemoveAlbumAction, REMOVE_ALBUM } from '@actions/album';
import { AlbumTile } from '@components/AlbumTile';
import { State, Album } from '@state/index';

import { AddAlbumButton } from './AddAlbumButton';
import { OverviewLayout as Layout } from './layout';

const Component: React.FunctionComponent = () => {
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
    <Layout>
      {albums.length ? (
        <ul>
          {albums.map(album => (
            <AlbumTile key={album.id} album={album} remove={album => remove(album)} />
          ))}
        </ul>
      ) : (
        <p>…haven’t been made yet?</p>
      )}
      <AddAlbumButton to="/add">Add album</AddAlbumButton>
    </Layout>
  );
};

export const Overview = Component;
