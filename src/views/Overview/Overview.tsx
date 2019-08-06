import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '@state/store';

import { AddAlbumButton } from './AddAlbumButton';
import { OverviewLayout as Layout } from './layout';

const Component: React.FunctionComponent = () => {
  const albums = useSelector(({ albums: state }: State) => state.albums);

  return (
    <Layout>
      {albums.length ? (
        <ul>
          {albums.map(({ name }) => (
            <li key={name}>{name}</li>
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
