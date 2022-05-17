import createSagaMiddleware from 'redux-saga'
import { useDispatch, useSelector } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), ...middlewares],
  devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppState = () => useSelector((state: RootState) => state)

export default store
