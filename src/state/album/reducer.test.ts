import { albumFactory } from '@test/album.mock';

import {
  LOAD_ALBUMS_SUCCESS,
  LoadAlbumsSuccessAction,
  LOAD_ALBUMS_ERROR,
  LoadAlbumsErrorAction,
  ADD_ALBUM_SUCCESS,
  AddAlbumSuccessAction,
  ADD_ALBUM_ERROR,
  AddAlbumErrorAction,
  REMOVE_ALBUM_SUCCESS,
  RemoveAlbumSuccessAction,
  REMOVE_ALBUM_ERROR,
  RemoveAlbumErrorAction,
  AUTO_COMPLETE_ALBUM_START,
  AutoCompleteAlbumStartAction,
  AUTO_COMPLETE_ALBUM_SUCCESS,
  AutoCompleteAlbumSuccessAction,
  AUTO_COMPLETE_ALBUM_ERROR,
  AutoCompleteAlbumErrorAction,
  AUTO_COMPLETE_ALBUM_RESET,
  AutoCompleteAlbumResetAction,
} from '@actions/album';
import { AlbumAutoCompleteTarget, AlbumAutoCompleteState } from '@state/album';

import { albumReducer as reducer, AlbumState } from './reducer';

describe('AlbumReducer', () => {
  const ALBUMS = albumFactory.buildList(3);

  describe('initial state', () => {
    it('is defined', () => {
      const initialState = reducer();
      expect(initialState).toBeTruthy();
    });

    it('has an empty albums-array', () => {
      const initialState = reducer();
      expect(initialState.list).toEqual([]);
    });
  });

  it('returns current state for unrecognized actions', () => {
    const state: AlbumState = { list: ALBUMS };
    expect(reducer(state)).toEqual(state);
  });

  it('updates album-list on albums-load success', () => {
    const state: AlbumState = { list: [] };
    const action: LoadAlbumsSuccessAction = { type: LOAD_ALBUMS_SUCCESS, albums: ALBUMS };
    expect(reducer(state, action).list).toEqual(ALBUMS);
  });

  it('leaves album-list unchanged on album-load error', () => {
    const oldList = ALBUMS.slice(1);
    const state: AlbumState = { list: oldList };
    const action: LoadAlbumsErrorAction = { type: LOAD_ALBUMS_ERROR };
    expect(reducer(state, action).list).toEqual(oldList);
  });

  it('defaults album-list to empty array on album-load error', () => {
    const action: LoadAlbumsErrorAction = { type: LOAD_ALBUMS_ERROR };
    expect(reducer(undefined, action).list).toEqual([]);
  });

  it('updates whole album-list on album-add success', () => {
    const oldList = [ALBUMS[0]];
    const newList = ALBUMS.slice(1);
    const state: AlbumState = { list: oldList };
    const action: AddAlbumSuccessAction = { type: ADD_ALBUM_SUCCESS, albums: newList };
    expect(reducer(state, action).list).toEqual(newList);
  });

  it('adds single album on album-add error', () => {
    const state: AlbumState = { list: ALBUMS.slice(0, 2) };
    const action: AddAlbumErrorAction = { type: ADD_ALBUM_ERROR, album: ALBUMS[2] };
    expect(reducer(state, action).list).toEqual(ALBUMS);
  });

  it('updates whole album-list on album-remove success', () => {
    const oldList = [ALBUMS[0]];
    const newList = ALBUMS.slice(1);
    const state: AlbumState = { list: oldList };
    const action: RemoveAlbumSuccessAction = { type: REMOVE_ALBUM_SUCCESS, albums: newList };
    expect(reducer(state, action).list).toEqual(newList);
  });

  it('removes single album on album-add error', () => {
    const state: AlbumState = { list: ALBUMS };
    const action: RemoveAlbumErrorAction = { type: REMOVE_ALBUM_ERROR, album: ALBUMS[1] };
    expect(reducer(state, action).list).toEqual([ALBUMS[0], ALBUMS[2]]);
  });

  describe('album auto-completion', () => {
    const TARGET = AlbumAutoCompleteTarget.DIALOG;

    describe('start-action', () => {
      it('sets loading-state', () => {
        const state: AlbumState = { list: [] };
        const action: AutoCompleteAlbumStartAction = { type: AUTO_COMPLETE_ALBUM_START, target: TARGET };

        expect(reducer(state, action).autoComplete).toBeDefined();
        expect(reducer(state, action).autoComplete![TARGET]).toBeDefined();
        expect(reducer(state, action).autoComplete![TARGET]!.state).toBe(AlbumAutoCompleteState.LOADING);
      });

      it('leaves previously suggested albums in peace', () => {
        const albums = ALBUMS.slice(1);
        const state: AlbumState = { list: [], autoComplete: { [TARGET]: { suggestions: albums } } };
        const action: AutoCompleteAlbumStartAction = { type: AUTO_COMPLETE_ALBUM_START, target: TARGET };

        expect(reducer(state, action).autoComplete![TARGET]!.suggestions).toEqual(albums);
      });
    });

    describe('error-action', () => {
      it('sets error-state', () => {
        const state: AlbumState = { list: [] };
        const action: AutoCompleteAlbumErrorAction = { type: AUTO_COMPLETE_ALBUM_ERROR, target: TARGET };

        expect(reducer(state, action).autoComplete).toBeDefined();
        expect(reducer(state, action).autoComplete![TARGET]).toBeDefined();
        expect(reducer(state, action).autoComplete![TARGET]!.state).toBe(AlbumAutoCompleteState.ERROR);
      });

      it('leaves previously suggested albums in peace', () => {
        const albums = ALBUMS.slice(1);
        const state: AlbumState = { list: [], autoComplete: { [TARGET]: { suggestions: albums } } };
        const action: AutoCompleteAlbumErrorAction = { type: AUTO_COMPLETE_ALBUM_ERROR, target: TARGET };

        expect(reducer(state, action).autoComplete![TARGET]!.suggestions).toEqual(albums);
      });
    });

    describe('succes-action', () => {
      it('sets suggested albums to a key defined by target-property of action', () => {
        const state: AlbumState = { list: [] };
        const action: AutoCompleteAlbumSuccessAction = {
          type: AUTO_COMPLETE_ALBUM_SUCCESS,
          albums: ALBUMS,
          target: TARGET,
        };

        expect(reducer(state, action).autoComplete).toBeDefined();
        expect(reducer(state, action).autoComplete![TARGET]).toBeDefined();
        expect(reducer(state, action).autoComplete![TARGET]!.suggestions).toBe(ALBUMS);
      });

      it('overwrites previously suggested albums with new ones', () => {
        const albums = ALBUMS.slice(1);
        const state: AlbumState = { list: [], autoComplete: { [TARGET]: { suggestions: ALBUMS } } };
        const action: AutoCompleteAlbumSuccessAction = { type: AUTO_COMPLETE_ALBUM_SUCCESS, albums, target: TARGET };

        expect(reducer(state, action).autoComplete![TARGET]!.suggestions).toEqual(albums);
      });

      it('sets success-state', () => {
        const state: AlbumState = { list: [] };
        const action: AutoCompleteAlbumSuccessAction = {
          type: AUTO_COMPLETE_ALBUM_SUCCESS,
          albums: [],
          target: TARGET,
        };

        expect(reducer(state, action).autoComplete![TARGET]!.state).toBe(AlbumAutoCompleteState.SUCCESS);
      });
    });

    describe('reset-action', () => {
      it('clears state', () => {
        const state: AlbumState = {
          list: [],
          autoComplete: { [TARGET]: { suggestions: ALBUMS, state: AlbumAutoCompleteState.SUCCESS } },
        };
        const action: AutoCompleteAlbumResetAction = { type: AUTO_COMPLETE_ALBUM_RESET, target: TARGET };

        expect(reducer(state, action).autoComplete).toBeDefined();
        expect(reducer(state, action).autoComplete![TARGET]).toBeUndefined();
      });
    });
  });
});
