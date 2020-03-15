import { takeLatest } from 'redux-saga/effects';

import { AUTO_COMPLETE_ALBUM, ADD_ALBUM, LOAD_ALBUMS, REMOVE_ALBUM } from '@actions/album';

import { addAlbumSaga, autoCompleteAlbumSaga, loadAlbumsSaga, removeAlbumSaga } from './album';

export default function* rootSaga() {
  yield takeLatest(LOAD_ALBUMS, loadAlbumsSaga);
  yield takeLatest(ADD_ALBUM, addAlbumSaga);
  yield takeLatest(REMOVE_ALBUM, removeAlbumSaga);
  yield takeLatest(AUTO_COMPLETE_ALBUM, autoCompleteAlbumSaga);
}
