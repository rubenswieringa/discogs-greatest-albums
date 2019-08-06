import { createStore, combineReducers } from 'redux';

import { albumReducer, AlbumState } from './album';

enum StateKeys {
  albums = 'albums',
}

export interface State {
  [StateKeys.albums]: AlbumState;
}

const reducers = combineReducers({
  [StateKeys.albums]: albumReducer,
});

export const store = createStore(reducers);
