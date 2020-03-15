import { Album } from '@state/album';

// if you’re looking for bloaty action-creator boilerplate then sorry

export const REMOVE_ALBUM = 'REMOVE_ALBUM';
export interface RemoveAlbumAction {
  type: typeof REMOVE_ALBUM;
  album: Album;
}

export const REMOVE_ALBUM_START = 'REMOVE_ALBUM_START';
export interface RemoveAlbumStartAction {
  type: typeof REMOVE_ALBUM_START;
  album: Album;
}

export const REMOVE_ALBUM_SUCCESS = 'REMOVE_ALBUM_SUCCESS';
export interface RemoveAlbumSuccessAction {
  type: typeof REMOVE_ALBUM_SUCCESS;
  albums: Album[];
}

export const REMOVE_ALBUM_ERROR = 'REMOVE_ALBUM_ERROR';
export interface RemoveAlbumErrorAction {
  type: typeof REMOVE_ALBUM_ERROR;
  album: Album;
}
