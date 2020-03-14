import { Album } from '@state/album';

// if you’re looking for bloaty action-creator boilerplate then sorry

export const LOAD_ALBUMS = 'LOAD_ALBUMS';
export interface LoadAlbumsAction {
  type: typeof LOAD_ALBUMS;
}

export const LOAD_ALBUMS_START = 'LOAD_ALBUMS_START';
export interface LoadAlbumsStartAction {
  type: typeof LOAD_ALBUMS_START;
}

export const LOAD_ALBUMS_SUCCESS = 'LOAD_ALBUMS_SUCCESS';
export interface LoadAlbumsSuccessAction {
  type: typeof LOAD_ALBUMS_SUCCESS;
  albums: Album[];
}

export const LOAD_ALBUMS_ERROR = 'LOAD_ALBUMS_ERROR';
export interface LoadAlbumsErrorAction {
  type: typeof LOAD_ALBUMS_ERROR;
}
