import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

declare global {
   interface Window {
     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
   }
}

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export type RootStateType = ReturnType<typeof store.getState>