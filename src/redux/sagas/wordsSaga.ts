import { put, call, takeEvery, SagaReturnType } from 'redux-saga/effects'
import axios from 'axios'
import {GET_WORDS_REQUESTED} from '../actions/actionTypes'
import {
   initialRequest,
   fetchSuccess,
   returnFailed
} from '../actions/wordsActions'

type Words = SagaReturnType<typeof getWords>

const urlWords = 'https://secret-ocean-49799.herokuapp.com/https://www.mrsoft.by/data.json'

const getWords = () =>{
  return axios
      .get(urlWords)
      .then<Array<string>>(({data: { data }}) => data)
      .catch((error) => {
         throw error
      })}

function* fetchWords() {
   try {
      const words: Words = yield call(getWords)      
      yield put(fetchSuccess(words))
   } catch (error) {
      yield put(returnFailed(error.message))
   }
}

function* getWordsSaga() {  
   yield takeEvery(GET_WORDS_REQUESTED, fetchWords)
}

export { getWordsSaga }