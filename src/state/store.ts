import { createStore, combineReducers } from 'redux';

import { albumReducer, AlbumState } from './album';

export interface State {
  albums: AlbumState;
}

type StateMap = { [key in keyof State]: any };

const reducers = combineReducers<StateMap>({
  albums: albumReducer,
});

export const store = createStore(reducers);
