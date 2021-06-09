import {
    GET_WORDS_REQUESTED,
    GET_WORDS_SUCCESS,
    WORDS_FAILED,
} from './actionTypes'

import {
    FetchRequestActionType,
    FetchSuccessType,
    FetchFailedType
} from '../types'

export const initialRequest = () : FetchRequestActionType => {
    return {
        type: GET_WORDS_REQUESTED
    }
}

export const fetchSuccess = (payload: string[]) : FetchSuccessType => {
    return {
        type: GET_WORDS_SUCCESS,
        payload 
    }
}

export const returnFailed = (payload: string) : FetchFailedType => {
    return {
        type: WORDS_FAILED,
        payload
    }
}