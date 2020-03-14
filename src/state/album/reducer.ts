import {
  ADD_ALBUM_SUCCESS,
  AddAlbumSuccessAction,
  ADD_ALBUM_ERROR,
  AddAlbumErrorAction,
  REMOVE_ALBUM,
  RemoveAlbumAction,
  AUTO_COMPLETE_ALBUM_SUCCESS,
  AutoCompleteAlbumSuccessAction,
  AUTO_COMPLETE_ALBUM_START,
  AutoCompleteAlbumStartAction,
  AUTO_COMPLETE_ALBUM_ERROR,
  AutoCompleteAlbumErrorAction,
  AUTO_COMPLETE_ALBUM_RESET,
  AutoCompleteAlbumResetAction,
} from '@actions/album';
import { AlbumAutoCompleteState, AlbumAutoCompleteTarget } from '@state/album';
import { albumEquals as equals } from '@utils/album';
import { adjustState } from '@utils/state';

import { Album } from './album';

type ReducerAction =
  | AddAlbumSuccessAction
  | AddAlbumErrorAction
  | RemoveAlbumAction
  | AutoCompleteAlbumStartAction
  | AutoCompleteAlbumSuccessAction
  | AutoCompleteAlbumErrorAction
  | AutoCompleteAlbumResetAction;

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
    case ADD_ALBUM_SUCCESS:
      const addSuccessAction = action as AddAlbumSuccessAction;
      return {
        ...state,
        list: addSuccessAction.albums.slice(), // copy
      };

    case ADD_ALBUM_ERROR:
      const addErrorAction = action as AddAlbumErrorAction;
      return {
        ...state,
        list: state.list.concat(addErrorAction.album),
      };

    case REMOVE_ALBUM:
      const removeAction = action as RemoveAlbumAction;
      return {
        ...state,
        list: state.list.filter(album => !equals(album, removeAction.album)),
      };

    case AUTO_COMPLETE_ALBUM_START:
      const acStartAction = action as AutoCompleteAlbumStartAction;
      return adjustState(state, ['autoComplete', acStartAction.target, 'state'], AlbumAutoCompleteState.LOADING);

    case AUTO_COMPLETE_ALBUM_SUCCESS:
      const acSuccessAction = action as AutoCompleteAlbumSuccessAction;
      return {
        ...state,
        autoComplete: {
          ...state.autoComplete,
          [acSuccessAction.target]: {
            suggestions: acSuccessAction.albums,
            state: AlbumAutoCompleteState.SUCCESS,
          },
        },
      };

    case AUTO_COMPLETE_ALBUM_ERROR:
      const acErrorAction = action as AutoCompleteAlbumErrorAction;
      return adjustState(state, ['autoComplete', acErrorAction.target, 'state'], AlbumAutoCompleteState.ERROR);

    case AUTO_COMPLETE_ALBUM_RESET:
      const acResetAction = action as AutoCompleteAlbumResetAction;
      const { [acResetAction.target]: disposable, ...autoComplete } = state.autoComplete!;
      return {
        ...state,
        autoComplete: { ...autoComplete },
      };

    default:
      return state;
  }
};
