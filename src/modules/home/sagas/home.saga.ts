import { ActionProps, ResponseProps } from '@src/core'
import { put, takeLatest } from 'redux-saga/effects'
import { actionTest, actionTestSuccess, actionTestFailure } from '../reducers'
import { signIn } from '../services'

function* onTest({ payload }: ActionProps) {
  try {
    const result: ResponseProps = yield signIn(payload)
    yield put(actionTestSuccess(result))
  } catch (err) {
    console.log('err: ', err)
    yield put(actionTestFailure(undefined))
  }
}

export function* watchHome() {
  yield takeLatest(actionTest.type, onTest)
}