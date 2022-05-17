import { all } from 'redux-saga/effects'
import { watchHome } from './home.saga'

export function* homeSaga() {
  yield all([
    watchHome()
  ])
}