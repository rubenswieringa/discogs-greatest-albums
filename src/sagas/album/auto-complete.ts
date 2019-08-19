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
import { requestSearchAlbums } from '@utils/album';

const MAX_SUGGESTIONS = 20;

export function* autoCompleteAlbumSaga({ query, target }: AutoCompleteAlbumAction) {
  yield put<AutoCompleteAlbumStartAction>({ type: AUTO_COMPLETE_ALBUM_START, target });

  let response: { data: { results: { id: number; title: string }[] } };

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
    .map(({ id, title }): Album => ({ id, name: title }));

  yield put<AutoCompleteAlbumSuccessAction>({ type: AUTO_COMPLETE_ALBUM_SUCCESS, albums, target });
}
