import { albumEquals as equals } from '@utils/album';

import { AlbumActions as Actions, ADD_ALBUM, REMOVE_ALBUM } from './actions';
import { Album } from './album';

export interface AlbumState {
  albums: Album[];
}

const INITIAL_STATE: AlbumState = {
  albums: [],
};

export const albumReducer = (state: AlbumState = INITIAL_STATE, action?: Actions) => {
  switch (action && action.type) {
    case ADD_ALBUM:
      return {
        ...state,
        albums: state.albums.concat(action!.album),
      };

    case REMOVE_ALBUM:
      return {
        ...state,
        albums: state.albums.filter(album => !equals(album, action!.album)),
      };

    default:
      return state;
  }
};
