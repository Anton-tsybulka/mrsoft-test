import { put, call, takeEvery, SagaReturnType } from 'redux-saga/effects'
import axios from 'axios'

import {
   initialRequest,
   fetchSuccess,
   returnFailed
} from '../actions/wordsActions'

interface ResponceInterface {
   data: string[]
}
type Words = SagaReturnType<typeof getWords>

const urlWords = 'https://secret-ocean-49799.herokuapp.com/https://www.mrsoft.by/data.json'

const getWords = () =>
   axios
      .get<Array<string>>(urlWords)
      .then((result) => result.data)
      .catch((error) => {
         throw error
      })

function* fetchWords() {
   try {
      const words: Words = yield call(getWords)
      yield put(fetchSuccess(words))
   } catch (error) {
      yield put(returnFailed(error.message))
   }
}

function* getWordsSaga() {
   yield takeEvery(initialRequest, fetchWords) // takeevery
}

export { getWordsSaga }