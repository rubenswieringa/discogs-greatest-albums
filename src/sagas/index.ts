import { takeLatest } from 'redux-saga/effects';

import { AUTO_COMPLETE_ALBUM, ADD_ALBUM, LOAD_ALBUMS } from '@actions/album';

import { addAlbumSaga, autoCompleteAlbumSaga, loadAlbumsSaga } from './album';

export default function* rootSaga() {
  yield takeLatest(ADD_ALBUM, addAlbumSaga);
  yield takeLatest(AUTO_COMPLETE_ALBUM, autoCompleteAlbumSaga);
  yield takeLatest(LOAD_ALBUMS, loadAlbumsSaga);
}
