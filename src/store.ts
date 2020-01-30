import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import sagas from '@sagas/index';
import { State, albumReducer } from '@state/index';

type StateMap = { [key in keyof State]: any };

const reducers = combineReducers<StateMap>({
  albums: albumReducer,
});

const sagaMiddleware = createSagaMiddleware();
const composedMiddleware = composeWithDevTools(applyMiddleware(sagaMiddleware));

export const store = createStore(reducers, composedMiddleware);

sagaMiddleware.run(sagas);
