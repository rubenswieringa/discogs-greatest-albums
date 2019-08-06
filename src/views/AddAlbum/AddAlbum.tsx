import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useRouter from 'use-react-router';

import { Button } from '@components/Button';
import { AddAlbumAction, ADD_ALBUM } from '@state/album/actions';

import { AddAlbumLayout as Layout } from './layout';
import { OpenDialog as Dialog } from './OpenDialog';

const Component: React.FunctionComponent = () => {
  const [name, setName] = useState<string>('');

  const { history } = useRouter();
  const close = useCallback(() => history.push('/'), []);

  const dispatch = useDispatch();
  const submit = useCallback(
    event => {
      event.preventDefault();
      if (!name) {
        return;
      }
      const action: AddAlbumAction = { type: ADD_ALBUM, album: { name } };
      dispatch(action);
      close();
    },
    [name],
  );

  return (
    <Layout as={Dialog}>
      <h2>Add album</h2>
      <input type="text" value={name} onChange={event => setName(event.target.value)} />
      <Button onClick={event => submit(event)}>Add</Button>
    </Layout>
  );
};

export const AddAlbum = Component;
