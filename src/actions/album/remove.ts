import { Album } from '@state/album';

// if you’re looking for bloaty action-creator boilerplate then sorry

export const REMOVE_ALBUM = 'REMOVE_ALBUM';
export interface RemoveAlbumAction {
  type: typeof REMOVE_ALBUM;
  album: Album;
}
