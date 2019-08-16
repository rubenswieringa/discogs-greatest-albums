import { AlbumState } from './album';

export * from './album';

export interface State {
  albums: AlbumState;
}
