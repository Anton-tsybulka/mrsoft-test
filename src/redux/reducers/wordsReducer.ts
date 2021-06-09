import {
    GET_WORDS_REQUESTED,
    GET_WORDS_SUCCESS,
    WORDS_FAILED,
} from '../actions/actionTypes'

import {
    InitialStateType,
    ReducerActions
} from '../types'

const initialState: InitialStateType = {
    data: [] ,
    loading: false,
    error: null
}

export const wordsReducer = (state: InitialStateType = initialState, action: ReducerActions) : InitialStateType => {
    switch (action.type) {
        case GET_WORDS_REQUESTED:
            return { ...state }
        case GET_WORDS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, ...action.payload],
            }
        case WORDS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state
    }
}