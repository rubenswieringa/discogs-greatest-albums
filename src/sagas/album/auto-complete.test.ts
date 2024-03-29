import { runSaga, Saga } from 'redux-saga';
import faker from 'faker';

import {
  AUTO_COMPLETE_ALBUM,
  AutoCompleteAlbumAction,
  AUTO_COMPLETE_ALBUM_START,
  AutoCompleteAlbumStartAction,
  AUTO_COMPLETE_ALBUM_SUCCESS,
  AutoCompleteAlbumSuccessAction,
  AUTO_COMPLETE_ALBUM_ERROR,
  AutoCompleteAlbumErrorAction,
} from '@actions/album';
import { AlbumAutoCompleteTarget, Album } from '@state/album';
import * as AlbumUtils from '@utils/album';

import { autoCompleteAlbumSaga } from './auto-complete';

jest.mock('@utils/album');
const requestSearchAlbums = <jest.Mock>AlbumUtils.requestSearchAlbums;

describe('autoCompleteAlbumSaga', () => {
  const QUERY = 'Amyl & The Sniffers';
  const TARGET = AlbumAutoCompleteTarget.DIALOG;
  const TRIGGER: AutoCompleteAlbumAction = {
    type: AUTO_COMPLETE_ALBUM,
    query: QUERY,
    target: TARGET,
  };

  type Action = AutoCompleteAlbumStartAction | AutoCompleteAlbumSuccessAction | AutoCompleteAlbumErrorAction;
  let dispatchedActions: Action[];

  const runSagaOptions = { dispatch: (action: Action) => dispatchedActions.push(action) };
  type runSagaArgsType = [typeof runSagaOptions, Saga, typeof TRIGGER];
  const runSagaArgs: runSagaArgsType = [runSagaOptions, autoCompleteAlbumSaga as Saga, TRIGGER];

  beforeEach(() => (dispatchedActions = []));
  afterEach(jest.restoreAllMocks);

  it('makes request thru requestSearchAlbums()', async done => {
    requestSearchAlbums.mockReturnValue(Promise.resolve({ data: { results: [] } }));
    await runSaga(...runSagaArgs).toPromise();

    expect(requestSearchAlbums).toHaveBeenCalledTimes(1);
    expect(requestSearchAlbums).toHaveBeenLastCalledWith(QUERY);
    done();
  });

  it('dispatches start-action on start', () => {
    requestSearchAlbums.mockReturnValue(new Promise(() => {}));
    runSaga(...runSagaArgs); // no need to wait; we already know everything we want to know

    const action: AutoCompleteAlbumStartAction = { type: AUTO_COMPLETE_ALBUM_START, target: TARGET };

    expect(dispatchedActions).toEqual([action]);
  });

  it('dispatches success-action if requestSearchAlbums() resolves', async done => {
    const apiAlbums = [
      { id: 1, title: 'Big Attraction', thumb: faker.image.abstract() },
      { id: 2, title: 'Giddy Up', thumb: faker.image.abstract() },
    ];
    requestSearchAlbums.mockReturnValue(Promise.resolve({ data: { results: apiAlbums } }));
    await runSaga(...runSagaArgs).toPromise();

    const albums: Album[] = apiAlbums.map(({ id, title: name, thumb: image }) => ({ id, name, image }));
    const action: AutoCompleteAlbumSuccessAction = { type: AUTO_COMPLETE_ALBUM_SUCCESS, target: TARGET, albums };

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[1]).toEqual(action);
    done();
  });

  it('dispatches error-action if requestSearchAlbums() rejects', async done => {
    requestSearchAlbums.mockReturnValue(Promise.reject());
    await runSaga(...runSagaArgs).toPromise();

    const action: AutoCompleteAlbumErrorAction = { type: AUTO_COMPLETE_ALBUM_ERROR, target: TARGET };

    expect(dispatchedActions.length).toBe(2);
    expect(dispatchedActions[1]).toEqual(action);
    done();
  });

  it('stops if cancelled', async done => {
    requestSearchAlbums.mockReturnValue(Promise.resolve({ data: { results: [] } }));
    const task = runSaga(...runSagaArgs);
    task.cancel();
    await task.toPromise();

    expect(task.isCancelled()).toBe(true);
    expect(dispatchedActions.length).toBe(1);
    expect(dispatchedActions[0].type).toEqual(AUTO_COMPLETE_ALBUM_START);
    done();
  });

  it('doesn’t dispatch error-action if cancelled', async done => {
    requestSearchAlbums.mockReturnValue(Promise.reject());
    const task = runSaga(...runSagaArgs);
    task.cancel();
    await task.toPromise();

    expect(task.isCancelled()).toBe(true);
    expect(dispatchedActions.length).toBe(1);
    expect(dispatchedActions[0].type).toEqual(AUTO_COMPLETE_ALBUM_START);
    done();
  });

  it('truncates to max 20 albums', async done => {
    const apiAlbums = Array(60)
      .fill(null)
      .map((_, index) => ({ id: index + 1, title: faker.random.words(), thumb: faker.random.image() }));

    requestSearchAlbums.mockReturnValue(Promise.resolve({ data: { results: apiAlbums } }));
    await runSaga(...runSagaArgs).toPromise();

    const albums: Album[] = apiAlbums.map(({ id, title: name, thumb: image }) => ({ id, name, image }));
    const action = dispatchedActions.find(
      ({ type }) => type === AUTO_COMPLETE_ALBUM_SUCCESS,
    ) as AutoCompleteAlbumSuccessAction;

    expect(action).toBeDefined();
    expect(action.albums && action.albums.length).toBe(20);
    expect(action.albums).toEqual(albums.slice(0, 20));
    done();
  });
});
