import { all } from 'redux-saga/effects';

import {ArticleSaga} from '../src/Sagas'
// import Collection from 'us.collection'

let sagas = [
  ...ArticleSaga,
  // ...Collection.Sagas
];

function* rootSaga() {
  yield all(sagas);
}

export default rootSaga;