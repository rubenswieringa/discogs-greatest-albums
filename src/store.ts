import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from '@sagas/index';
import { State, albumReducer } from '@state/index';

type StateMap = { [key in keyof State]: any };

const reducers = combineReducers<StateMap>({
  albums: albumReducer,
});

const middleware = createSagaMiddleware();

export const store = createStore(reducers, applyMiddleware(middleware));

middleware.run(sagas);
