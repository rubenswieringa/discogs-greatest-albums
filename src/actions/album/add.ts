import { Album } from '@state/album';

// if you’re looking for bloaty action-creator boilerplate then sorry

export const ADD_ALBUM = 'ADD_ALBUM';
export interface AddAlbumAction {
  type: typeof ADD_ALBUM;
  album: Album;
}

export const ADD_ALBUM_START = 'ADD_ALBUM_START';
export interface AddAlbumStartAction {
  type: typeof ADD_ALBUM_START;
  album: Album;
}

export const ADD_ALBUM_SUCCESS = 'ADD_ALBUM_SUCCESS';
export interface AddAlbumSuccessAction {
  type: typeof ADD_ALBUM_SUCCESS;
  albums: Album[];
}

export const ADD_ALBUM_ERROR = 'ADD_ALBUM_ERROR';
export interface AddAlbumErrorAction {
  type: typeof ADD_ALBUM_ERROR;
  album: Album;
}
