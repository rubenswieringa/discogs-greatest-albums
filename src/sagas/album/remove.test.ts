import { runSaga, Saga } from 'redux-saga';

import { albumFactory } from '@test/album.mock';

import {
  REMOVE_ALBUM,
  RemoveAlbumAction,
  REMOVE_ALBUM_START,
  RemoveAlbumStartAction,
  REMOVE_ALBUM_SUCCESS,
  RemoveAlbumSuccessAction,
  REMOVE_ALBUM_ERROR,
  RemoveAlbumErrorAction,
} from '@actions/album';
import { albumEquals as equals } from '@utils/album';

import { removeAlbumSaga } from './remove';
import { LOCAL_STORAGE_ALBUMS_KEY } from './local-storage-albums-key';

describe('removeAlbumSaga', () => {
  const ALBUMS = albumFactory.buildList(3);
  const ALBUM = ALBUMS[1];

  const TRIGGER: RemoveAlbumAction = {
    type: REMOVE_ALBUM,
    album: ALBUM,
  };

  type Action = RemoveAlbumStartAction & RemoveAlbumSuccessAction & RemoveAlbumErrorAction;
  let dispatchedActions: Action[];

  const runSagaOptions = { dispatch: (action: Action) => dispatchedActions.push(action) };
  type runSagaArgsType = [typeof runSagaOptions, Saga, typeof TRIGGER];
  const runSagaArgs: runSagaArgsType = [runSagaOptions, removeAlbumSaga, TRIGGER];

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    dispatchedActions = [];
  });

  it('dispatches start-action on start', () => {
    runSaga(...runSagaArgs);
    const action: RemoveAlbumStartAction = { type: REMOVE_ALBUM_START, album: ALBUM };
    expect(dispatchedActions[0]).toEqual(action);
  });

  it('removes album from local storage', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(ALBUMS));
    runSaga(...runSagaArgs);
    const remainingAlbums = ALBUMS.filter(album => album.id !== ALBUM.id);
    expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_ALBUMS_KEY);
    expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_ALBUMS_KEY, JSON.stringify(remainingAlbums));
  });

  it('dispatches error-action if album is not present in local storage', () => {
    const albums = ALBUMS.filter(album => !equals(album, ALBUM));
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(albums));
    runSaga(...runSagaArgs);
    const action: RemoveAlbumErrorAction = { type: REMOVE_ALBUM_ERROR, album: ALBUM };
    expect(dispatchedActions[1]).toEqual(action);
  });

  it('dispatches error-action if local storage is unavailable', () => {
    Storage.prototype.getItem = jest.fn(() => {
      throw new Error();
    });
    runSaga(...runSagaArgs);
    const action: RemoveAlbumErrorAction = { type: REMOVE_ALBUM_ERROR, album: ALBUM };
    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[1]).toEqual(action);
  });

  it('dispatches error-action if local storage has invalid JSON', () => {
    Storage.prototype.getItem = jest.fn(() => '{;');
    runSaga(...runSagaArgs);
    const action: RemoveAlbumErrorAction = { type: REMOVE_ALBUM_ERROR, album: ALBUM };
    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[1]).toEqual(action);
  });

  it('dispatches success-action', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(ALBUMS));
    runSaga(...runSagaArgs);
    const remainingAlbums = ALBUMS.filter(album => !equals(album, ALBUM));
    const action: RemoveAlbumSuccessAction = { type: REMOVE_ALBUM_SUCCESS, albums: remainingAlbums };
    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[1]).toEqual(action);
  });
});
