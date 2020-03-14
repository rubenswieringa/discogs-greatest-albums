import { put } from 'redux-saga/effects';

import {
  AddAlbumAction,
  ADD_ALBUM_START,
  AddAlbumStartAction,
  ADD_ALBUM_SUCCESS,
  AddAlbumSuccessAction,
  ADD_ALBUM_ERROR,
  AddAlbumErrorAction,
} from '@actions/album';

import { LOCAL_STORAGE_ALBUMS_KEY } from './local-storage-albums-key';

export function* addAlbumSaga({ album }: AddAlbumAction) {
  yield put<AddAlbumStartAction>({ type: ADD_ALBUM_START, album });

  let existingData;
  try {
    existingData = localStorage.getItem(LOCAL_STORAGE_ALBUMS_KEY);
  } catch {}

  let albums, existingAlbums;
  try {
    if (existingData) existingAlbums = JSON.parse(existingData);
  } catch {
  } finally {
    albums = Array.isArray(existingAlbums) ? existingAlbums.concat(album) : [album];
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_ALBUMS_KEY, JSON.stringify(albums));
  } catch {
    yield put<AddAlbumErrorAction>({ type: ADD_ALBUM_ERROR, album });
    return;
  }

  yield put<AddAlbumSuccessAction>({ type: ADD_ALBUM_SUCCESS, albums });
}
