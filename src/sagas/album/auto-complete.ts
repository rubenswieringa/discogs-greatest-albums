import { put, call, cancelled } from 'redux-saga/effects';

import { Album } from '@state/album';
import {
  AutoCompleteAlbumAction,
  AUTO_COMPLETE_ALBUM_SUCCESS,
  AutoCompleteAlbumSuccessAction,
  AUTO_COMPLETE_ALBUM_ERROR,
  AutoCompleteAlbumErrorAction,
  AUTO_COMPLETE_ALBUM_START,
  AutoCompleteAlbumStartAction,
} from '@actions/album';
import { requestSearchAlbums, DiscogsAPIResponse } from '@utils/album';

const MAX_SUGGESTIONS = 20;

export function* autoCompleteAlbumSaga({ query, target }: AutoCompleteAlbumAction) {
  yield put<AutoCompleteAlbumStartAction>({ type: AUTO_COMPLETE_ALBUM_START, target });

  let response: DiscogsAPIResponse;

  try {
    response = yield call(requestSearchAlbums, query);
  } catch {
    if (!(yield cancelled())) {
      yield put<AutoCompleteAlbumErrorAction>({ type: AUTO_COMPLETE_ALBUM_ERROR, target });
      return;
    }
  } finally {
    if (yield cancelled()) {
      return;
    }
  }

  const albums: Album[] = response!.data.results
    .slice(0, MAX_SUGGESTIONS)
    .map(({ id, title: name, thumb: image }): Album => ({ id, name, image }));

  yield put<AutoCompleteAlbumSuccessAction>({ type: AUTO_COMPLETE_ALBUM_SUCCESS, albums, target });
}
