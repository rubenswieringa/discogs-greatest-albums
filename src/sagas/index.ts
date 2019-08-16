import { takeEvery } from 'redux-saga/effects';

import { AUTO_COMPLETE_ALBUM } from '@actions/album';

import { autoCompleteAlbumSaga } from './album';

export default function* rootSaga() {
  yield takeEvery(AUTO_COMPLETE_ALBUM, autoCompleteAlbumSaga);
}
