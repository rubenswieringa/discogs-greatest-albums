import { Album, AlbumAutoCompleteTarget } from '@state/album';

// if you’re looking for bloaty action-creator boilerplate then sorry

export const AUTO_COMPLETE_ALBUM = 'AUTO_COMPLETE_ALBUM';
export interface AutoCompleteAlbumAction {
  type: typeof AUTO_COMPLETE_ALBUM;
  query: string;
  target: AlbumAutoCompleteTarget;
}

export const AUTO_COMPLETE_ALBUM_START = 'AUTO_COMPLETE_ALBUM_START';
export interface AutoCompleteAlbumStartAction {
  type: typeof AUTO_COMPLETE_ALBUM_START;
  target: AlbumAutoCompleteTarget;
}

export const AUTO_COMPLETE_ALBUM_SUCCESS = 'AUTO_COMPLETE_ALBUM_SUCCESS';
export interface AutoCompleteAlbumSuccessAction {
  type: typeof AUTO_COMPLETE_ALBUM_SUCCESS;
  albums: Album[];
  target: AlbumAutoCompleteTarget;
}

export const AUTO_COMPLETE_ALBUM_ERROR = 'AUTO_COMPLETE_ALBUM_ERROR';
export interface AutoCompleteAlbumErrorAction {
  type: typeof AUTO_COMPLETE_ALBUM_ERROR;
  target: AlbumAutoCompleteTarget;
}

export const AUTO_COMPLETE_ALBUM_RESET = 'AUTO_COMPLETE_ALBUM_RESET';
export interface AutoCompleteAlbumResetAction {
  type: typeof AUTO_COMPLETE_ALBUM_RESET;
  target: AlbumAutoCompleteTarget;
}
