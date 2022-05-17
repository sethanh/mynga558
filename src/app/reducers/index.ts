import { combineReducers } from '@reduxjs/toolkit'
import { homeReducers } from '@src/modules'
import loadingSlice from './loading.reducer'
import appSlice from './app.reducer'
import languageSlice from './language.reducer'

export * from './language.reducer'

const appReducer = combineReducers({
    app: appSlice,
    loading: loadingSlice,
    ...homeReducers,
    language: languageSlice
})

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action)
}

export default rootReducer
