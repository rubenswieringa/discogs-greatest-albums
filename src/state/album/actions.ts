import { Album } from './album';

// if you’re looking for bloaty action-creator boilerplate then sorry

export const ADD_ALBUM = 'ADD_ALBUM';
export interface AddAlbumAction {
  type: typeof ADD_ALBUM;
  album: Album;
}

export const REMOVE_ALBUM = 'REMOVE_ALBUM';
export interface RemoveAlbumAction {
  type: typeof REMOVE_ALBUM;
  album: Album;
}

export type AlbumActions = AddAlbumAction | RemoveAlbumAction;
