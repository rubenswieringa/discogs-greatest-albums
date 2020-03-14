import { takeLatest } from 'redux-saga/effects';

import { AUTO_COMPLETE_ALBUM, ADD_ALBUM } from '@actions/album';

import { addAlbumSaga, autoCompleteAlbumSaga } from './album';

export default function* rootSaga() {
  yield takeLatest(ADD_ALBUM, addAlbumSaga);
  yield takeLatest(AUTO_COMPLETE_ALBUM, autoCompleteAlbumSaga);
}
