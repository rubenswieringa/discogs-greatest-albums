import { put } from 'redux-saga/effects';

import {
  RemoveAlbumAction,
  REMOVE_ALBUM_START,
  RemoveAlbumStartAction,
  REMOVE_ALBUM_SUCCESS,
  RemoveAlbumSuccessAction,
  REMOVE_ALBUM_ERROR,
  RemoveAlbumErrorAction,
} from '@actions/album';
import { albumEquals as equals } from '@utils/album';

import { LOCAL_STORAGE_ALBUMS_KEY } from './local-storage-albums-key';

export function* removeAlbumSaga({ album }: RemoveAlbumAction) {
  yield put<RemoveAlbumStartAction>({ type: REMOVE_ALBUM_START, album });

  let existingData;
  try {
    existingData = localStorage.getItem(LOCAL_STORAGE_ALBUMS_KEY);
  } catch {
    yield put<RemoveAlbumErrorAction>({ type: REMOVE_ALBUM_ERROR, album });
    return;
  }

  let albums, existingAlbums;

  try {
    if (existingData) existingAlbums = JSON.parse(existingData);
  } catch {
  } finally {
    if (!Array.isArray(existingAlbums) || !existingAlbums.some(otherAlbum => equals(album, otherAlbum))) {
      yield put<RemoveAlbumErrorAction>({ type: REMOVE_ALBUM_ERROR, album });
      return;
    }
    albums = existingAlbums.filter(otherAlbum => !equals(album, otherAlbum));
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_ALBUMS_KEY, JSON.stringify(albums));
  } catch {
    yield put<RemoveAlbumErrorAction>({ type: REMOVE_ALBUM_ERROR, album });
    return;
  }

  yield put<RemoveAlbumSuccessAction>({ type: REMOVE_ALBUM_SUCCESS, albums });
}
