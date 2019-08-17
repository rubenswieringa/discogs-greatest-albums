import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRouter from 'use-react-router';

import { AddAlbumAction, ADD_ALBUM, AutoCompleteAlbumAction, AUTO_COMPLETE_ALBUM } from '@actions/album';
import { Button } from '@components/Button';
import { AlbumAutoCompleteTarget, Album, AlbumAutoCompleteState } from '@state/album';
import { State } from '@state/index';

import { AddAlbumLayout as Layout } from './layout';
import { OpenDialog as Dialog } from './OpenDialog';

const Component: React.FunctionComponent = () => {
  const { history } = useRouter();
  const close = useCallback(() => history.push('/'), []);
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const target = AlbumAutoCompleteTarget.DIALOG;
  const autoComplete = useSelector(({ albums: { autoComplete } }: State) => autoComplete && autoComplete[target]);

  const search = useCallback((event?) => {
    const value = event ? event.target.value : name;
    if (name !== value) {
      setName(value);
    }
    if (!value) {
      return;
    }
    dispatch<AutoCompleteAlbumAction>({ type: AUTO_COMPLETE_ALBUM, query: value, target });
  }, []);

  const pick = useCallback(
    (album: Album, event: { preventDefault: () => void }) => {
      event.preventDefault();
      dispatch<AddAlbumAction>({ type: ADD_ALBUM, album });
      close();
    },
    [name],
  );

  return (
    <Layout as={Dialog}>
      <h2>Add album</h2>
      <input type="text" value={name} onChange={event => search(event)} />
      {autoComplete && (
        <>
          <p>Did you mean…{autoComplete.state && ` (${autoComplete.state.toLowerCase()})`}</p>
          {autoComplete.state === AlbumAutoCompleteState.ERROR && (
            <p>
              Something went wrong – <a onClick={() => search()}>click here to try again</a>
            </p>
          )}
          {autoComplete.suggestions && autoComplete.suggestions.length && (
            <ul>
              {autoComplete.suggestions.map(album => (
                <li key={album.id}>
                  <Button onClick={event => pick(album, event)}>{album.name}</Button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Layout>
  );
};

export const AddAlbum = Component;
