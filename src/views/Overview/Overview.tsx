import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '@state/index';

import { AddAlbumButton } from './AddAlbumButton';
import { OverviewLayout as Layout } from './layout';
import { AlbumTile } from '@components/AlbumTile';

const Component: React.FunctionComponent = () => {
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
