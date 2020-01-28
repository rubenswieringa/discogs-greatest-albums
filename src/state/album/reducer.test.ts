import faker from 'faker';

import {
  ADD_ALBUM,
  AddAlbumAction,
  REMOVE_ALBUM,
  RemoveAlbumAction,
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
import { Album } from './album';

describe('AlbumReducer', () => {
  const ALBUMS: Album[] = [
    { id: 1, name: 'Demo', image: faker.image.abstract() },
    { id: 2, name: 'Peach', image: faker.image.abstract() },
    { id: 3, name: 'Bay Dream', image: faker.image.abstract() },
  ];

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

  it('adds albums', () => {
    const state: AlbumState = { list: ALBUMS.slice(0, 2) };
    const action: AddAlbumAction = { type: ADD_ALBUM, album: ALBUMS[2] };
    expect(reducer(state, action).list).toEqual(ALBUMS);
  });

  it('removes albums', () => {
    const state: AlbumState = { list: ALBUMS };
    const action: RemoveAlbumAction = { type: REMOVE_ALBUM, album: ALBUMS[1] };
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
