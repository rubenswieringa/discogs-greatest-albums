import {
  ADD_ALBUM,
  AddAlbumAction,
  REMOVE_ALBUM,
  RemoveAlbumAction,
  AUTO_COMPLETE_ALBUM_SUCCESS,
  AutoCompleteAlbumSuccessAction,
  AUTO_COMPLETE_ALBUM_START,
  AutoCompleteAlbumStartAction,
  AUTO_COMPLETE_ALBUM_ERROR,
  AutoCompleteAlbumErrorAction,
} from '@actions/album';
import { AlbumAutoCompleteState, AlbumAutoCompleteTarget } from '@state/album';
import { albumEquals as equals } from '@utils/album';
import { adjustState } from '@utils/state';

import { Album } from './album';

type ReducerAction =
  | AddAlbumAction
  | RemoveAlbumAction
  | AutoCompleteAlbumStartAction
  | AutoCompleteAlbumSuccessAction
  | AutoCompleteAlbumErrorAction;

interface AutoCompleteState {
  suggestions: Album[];
  state?: AlbumAutoCompleteState;
}

export interface AlbumState {
  list: Album[];
  autoComplete?: { [key in AlbumAutoCompleteTarget]?: AutoCompleteState };
}

const INITIAL_STATE: AlbumState = {
  list: [],
  autoComplete: {},
};

export const albumReducer = (state: AlbumState = INITIAL_STATE, action?: ReducerAction): AlbumState => {
  switch (action && action.type) {
    case ADD_ALBUM:
      const addAction = action as AddAlbumAction;
      return {
        ...state,
        list: state.list.concat(addAction.album),
      };

    case REMOVE_ALBUM:
      const removeAction = action as RemoveAlbumAction;
      return {
        ...state,
        list: state.list.filter(album => !equals(album, removeAction.album)),
      };

    case AUTO_COMPLETE_ALBUM_START:
      const startAction = action as AutoCompleteAlbumStartAction;
      return adjustState(state, ['autoComplete', startAction.target, 'state'], AlbumAutoCompleteState.LOADING);

    case AUTO_COMPLETE_ALBUM_SUCCESS:
      const successAction = action as AutoCompleteAlbumSuccessAction;
      return {
        ...state,
        autoComplete: {
          ...state.autoComplete,
          [successAction.target]: {
            suggestions: successAction.albums,
            state: AlbumAutoCompleteState.SUCCESS,
          },
        },
      };

    case AUTO_COMPLETE_ALBUM_ERROR:
      const errorAction = action as AutoCompleteAlbumErrorAction;
      return adjustState(state, ['autoComplete', errorAction.target, 'state'], AlbumAutoCompleteState.ERROR);

    default:
      return state;
  }
};
