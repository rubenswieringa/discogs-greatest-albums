import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRouter from 'use-react-router';
import { useDebounce } from 'use-debounce';

import {
  AddAlbumAction,
  ADD_ALBUM,
  AutoCompleteAlbumAction,
  AUTO_COMPLETE_ALBUM,
  AutoCompleteAlbumResetAction,
  AUTO_COMPLETE_ALBUM_RESET,
} from '@actions/album';
import { AlbumListItem } from '@components/AlbumListItem';
import { AlbumAutoCompleteTarget, Album, AlbumAutoCompleteState } from '@state/album';
import { State } from '@state/index';

import { AddAlbumLayout as Layout } from './layout';
import { OpenDialog as Dialog } from './OpenDialog';

const TARGET = AlbumAutoCompleteTarget.DIALOG;
const ESC_EVENT_TYPE = 'keydown';
const ESC_KEY_CODE = 27;

const Component: React.FunctionComponent = () => {
  const { history } = useRouter();
  const close = useCallback(() => history.push('/'), []);

  const [name, setName] = useState<string>('');
  const autoComplete = useSelector(({ albums: { autoComplete } }: State) => autoComplete && autoComplete[TARGET]);

  const dispatch = useDispatch();

  const reset = useCallback(() => {
    dispatch<AutoCompleteAlbumResetAction>({ type: AUTO_COMPLETE_ALBUM_RESET, target: TARGET });
  }, []);

  const search = useCallback(
    (event?) => {
      const value = event ? event.target.value : name;
      if (name !== value) {
        setName(value);
      }
      if (!value) {
        return;
      }
      dispatch<AutoCompleteAlbumAction>({ type: AUTO_COMPLETE_ALBUM, query: value, target: TARGET });
    },
    [name],
  );

  const pick = useCallback(
    (album: Album) => {
      dispatch<AddAlbumAction>({ type: ADD_ALBUM, album });
      close();
    },
    [close],
  );

  useEffect(reset, []);

  const [debouncedName] = useDebounce(name, 500);
  useEffect(search, [debouncedName]);

  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.keyCode !== ESC_KEY_CODE) return;
      event.preventDefault();
      close();
    };
    window.addEventListener(ESC_EVENT_TYPE, closeOnEsc);
    return () => window.removeEventListener(ESC_EVENT_TYPE, closeOnEsc);
  }, []);

  return (
    <Layout as={Dialog}>
      <h2>Add album</h2>
      <input type="text" value={name} onChange={event => setName(event.target.value)} />
      {name && autoComplete && (
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
                <AlbumListItem key={album.id} album={album} select={album => pick(album)} />
              ))}
            </ul>
          )}
        </>
      )}
    </Layout>
  );
};

export const AddAlbum = Component;
