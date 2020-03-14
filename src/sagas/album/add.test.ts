import { runSaga } from 'redux-saga';

import { albumFactory } from '@test/album.mock';

import {
  ADD_ALBUM,
  AddAlbumAction,
  ADD_ALBUM_START,
  AddAlbumStartAction,
  ADD_ALBUM_SUCCESS,
  AddAlbumSuccessAction,
  ADD_ALBUM_ERROR,
  AddAlbumErrorAction,
} from '@actions/album';
import { Album } from '@state/album';

import { addAlbumSaga, LOCAL_STORAGE_ALBUMS_KEY } from './add';

describe('addAlbumSaga', () => {
  const ALBUMS = albumFactory.buildList(3);
  const ALBUM = ALBUMS.shift() as Album;

  const TRIGGER: AddAlbumAction = {
    type: ADD_ALBUM,
    album: ALBUM,
  };

  type Action = AddAlbumStartAction & AddAlbumSuccessAction & AddAlbumErrorAction;
  let dispatchedActions: Action[];

  const runSagaOptions = { dispatch: (action: Action) => dispatchedActions.push(action) };
  type runSagaArgsType = [typeof runSagaOptions, typeof addAlbumSaga, typeof TRIGGER];
  let runSagaArgs: runSagaArgsType = [runSagaOptions, addAlbumSaga, TRIGGER];

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    dispatchedActions = [];
  });

  it('dispatches start-action on start', () => {
    runSaga(...runSagaArgs);
    const action: AddAlbumStartAction = { type: ADD_ALBUM_START, album: ALBUM };
    expect(dispatchedActions[0]).toEqual(action);
  });

  it('saves album in local storage', () => {
    runSaga(...runSagaArgs);
    expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_ALBUMS_KEY, JSON.stringify([ALBUM]));
  });

  it('leaves existing albums in local storage', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(ALBUMS));
    runSaga(...runSagaArgs);
    expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_ALBUMS_KEY, JSON.stringify(ALBUMS.concat(ALBUM)));
  });

  it('ignores invalid JSON in local storage', () => {
    Storage.prototype.getItem = jest.fn(() => '{;');
    runSaga(...runSagaArgs);
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(actionTypes).not.toContain(ADD_ALBUM_ERROR);
  });

  it('dispatches error-action if local storage is unavailable', () => {
    Storage.prototype.setItem = jest.fn(() => {
      throw new Error();
    });
    runSaga(...runSagaArgs);
    const action: AddAlbumErrorAction = { type: ADD_ALBUM_ERROR, album: ALBUM };
    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[1]).toEqual(action);
  });

  it('dispatches success-action', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(ALBUMS));
    runSaga(...runSagaArgs);
    const action: AddAlbumSuccessAction = { type: ADD_ALBUM_SUCCESS, albums: ALBUMS.concat(ALBUM) };
    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[1]).toEqual(action);
  });
});
