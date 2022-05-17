import { createSlice } from '@reduxjs/toolkit'


const homeSlice = createSlice({
  name: 'home',
  initialState: {},
  reducers: {
    actionTest(state, action) {
      console.log(action)
      return {
        ...state,
      }
    },
    actionTestSuccess(state, action) {
      return {
        ...state,
        signInSuccess: action.payload,
      }
    },
    actionTestFailure(state, action) {
      const { payload } = action || {}
      return {
        ...state,
        signInFailure: payload,
      }
    },
  }
})

export const { actionTest, actionTestSuccess, actionTestFailure } = homeSlice.actions
export default homeSlice.reducer
