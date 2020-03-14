import { runSaga } from 'redux-saga';

import { albumFactory } from '@test/album.mock';

import {
  LOAD_ALBUMS,
  LoadAlbumsAction,
  LOAD_ALBUMS_START,
  LoadAlbumsStartAction,
  LOAD_ALBUMS_SUCCESS,
  LoadAlbumsSuccessAction,
  LOAD_ALBUMS_ERROR,
  LoadAlbumsErrorAction,
} from '@actions/album';

import { loadAlbumsSaga } from './load';
import { LOCAL_STORAGE_ALBUMS_KEY } from './local-storage-albums-key';

describe('loadAlbumsSaga', () => {
  const ALBUMS = albumFactory.buildList(3);

  const TRIGGER: LoadAlbumsAction = {
    type: LOAD_ALBUMS,
  };

  type Action = LoadAlbumsStartAction | LoadAlbumsSuccessAction | LoadAlbumsErrorAction;
  let dispatchedActions: Action[];

  const runSagaOptions = { dispatch: (action: Action) => dispatchedActions.push(action) };
  type runSagaArgsType = [typeof runSagaOptions, typeof loadAlbumsSaga, typeof TRIGGER];
  let runSagaArgs: runSagaArgsType = [runSagaOptions, loadAlbumsSaga, TRIGGER];

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    dispatchedActions = [];
  });

  it('dispatches start-action on start', () => {
    runSaga(...runSagaArgs); // no need to wait; we already know everything we want to know
    const action: LoadAlbumsStartAction = { type: LOAD_ALBUMS_START };
    expect(dispatchedActions[0]).toEqual(action);
  });

  it('loads albums from local storage', () => {
    runSaga(...runSagaArgs);
    expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_ALBUMS_KEY);
  });

  it('dispatches error-action if local storage is unavailable', () => {
    Storage.prototype.getItem = jest.fn(() => {
      throw new Error();
    });
    runSaga(...runSagaArgs);
    const action: LoadAlbumsErrorAction = { type: LOAD_ALBUMS_ERROR };
    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[1]).toEqual(action);
  });

  it('ignores invalid JSON in local storage', () => {
    Storage.prototype.getItem = jest.fn(() => '{;');
    runSaga(...runSagaArgs);
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(actionTypes).not.toContain(LOAD_ALBUMS_ERROR);
  });

  it('dispatches success-action', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(ALBUMS));
    runSaga(...runSagaArgs);
    const action: LoadAlbumsSuccessAction = { type: LOAD_ALBUMS_SUCCESS, albums: ALBUMS };
    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[1]).toEqual(action);
  });
});
