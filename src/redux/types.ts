import {
    GET_WORDS_REQUESTED,
    GET_WORDS_SUCCESS,
    WORDS_FAILED,
  } from './actions/actionTypes'

export type InitialStateType ={
    data: string []
    loading: boolean
    error: null | string | undefined
}
  
export type FetchRequestActionType = {
    type: typeof GET_WORDS_REQUESTED
}
  
export type FetchSuccessType = {
    type: typeof GET_WORDS_SUCCESS
    payload: Array<string>
}
  
export type FetchFailedType = {
    type: typeof WORDS_FAILED
    payload: string
}
  
export type ReducerActions =
    | FetchRequestActionType
    | FetchSuccessType
    | FetchFailedType;