import { put } from 'redux-saga/effects';

import {
  LOAD_ALBUMS_ERROR,
  LoadAlbumsErrorAction,
  LOAD_ALBUMS_START,
  LoadAlbumsStartAction,
  LOAD_ALBUMS_SUCCESS,
  LoadAlbumsSuccessAction,
} from '@actions/album';

import { LOCAL_STORAGE_ALBUMS_KEY } from './local-storage-albums-key';

export function* loadAlbumsSaga() {
  yield put<LoadAlbumsStartAction>({ type: LOAD_ALBUMS_START });

  let data;
  try {
    data = localStorage.getItem(LOCAL_STORAGE_ALBUMS_KEY);
  } catch {
    yield put<LoadAlbumsErrorAction>({ type: LOAD_ALBUMS_ERROR });
    return;
  }

  let albums;
  try {
    if (data) albums = JSON.parse(data);
  } catch {
  } finally {
    albums = Array.isArray(albums) ? albums : [];
  }

  yield put<LoadAlbumsSuccessAction>({ type: LOAD_ALBUMS_SUCCESS, albums });
}
