import { takeLatest } from 'redux-saga/effects';

import { AUTO_COMPLETE_ALBUM } from '@actions/album';

import { autoCompleteAlbumSaga } from './album';

export default function* rootSaga() {
  yield takeLatest(AUTO_COMPLETE_ALBUM, autoCompleteAlbumSaga);
}
