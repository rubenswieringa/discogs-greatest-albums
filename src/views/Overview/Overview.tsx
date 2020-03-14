import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_ALBUMS, LoadAlbumsAction } from '@actions/album';
import { AlbumTile } from '@components/AlbumTile';
import { State } from '@state/index';

import { AddAlbumButton } from './AddAlbumButton';
import { OverviewLayout as Layout } from './layout';

const Component: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<LoadAlbumsAction>({ type: LOAD_ALBUMS });
  }, []);

  const albums = useSelector(({ albums }: State) => albums.list);

  return (
    <Layout>
      {albums.length ? (
        <ul>
          {albums.map(album => (
            <AlbumTile key={album.id} album={album} />
          ))}
        </ul>
      ) : (
        <p>Nothing here yet.</p>
      )}
      <AddAlbumButton to="/add">Add album</AddAlbumButton>
    </Layout>
  );
};

export const Overview = Component;
