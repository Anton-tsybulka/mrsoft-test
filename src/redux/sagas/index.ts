import { all } from 'redux-saga/effects'
import { getWordsSaga } from './wordsSaga'

export default function* rootSaga() {
   yield all([
      getWordsSaga(),
   ])
}