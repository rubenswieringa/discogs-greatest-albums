import { ADD_ALBUM, REMOVE_ALBUM, AddAlbumAction, RemoveAlbumAction } from './actions';
import { albumReducer as reducer, AlbumState } from './reducer';

describe('AlbumReducer', () => {
  describe('initial state', () => {
    it('is defined', () => {
      const initialState = reducer();
      expect(initialState).toBeTruthy();
    });

    it('has an empty albums-array', () => {
      const initialState = reducer();
      expect(initialState.albums).toEqual([]);
    });
  });

  it('returns current state for unrecognized actions', () => {
    const state: AlbumState = { albums: [{ name: 'Demo' }, { name: 'Peach' }, { name: 'Bay Dream' }] };
    expect(reducer(state)).toEqual(state);
  });

  it('adds albums', () => {
    const albums = [{ name: 'Demo' }, { name: 'Peach' }, { name: 'Bay Dream' }];
    const state: AlbumState = { albums: albums.slice(0, 2) };
    const action: AddAlbumAction = { type: ADD_ALBUM, album: albums[2] };
    expect(reducer(state, action).albums).toEqual(albums);
  });

  it('removes albums', () => {
    const albums = [{ name: 'Demo' }, { name: 'Peach' }, { name: 'Bay Dream' }];
    const state: AlbumState = { albums };
    const action: RemoveAlbumAction = { type: REMOVE_ALBUM, album: albums[1] };
    expect(reducer(state, action).albums).toEqual([albums[0], albums[2]]);
  });
});
