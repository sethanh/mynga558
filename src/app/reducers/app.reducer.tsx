
import { createSlice } from '@reduxjs/toolkit'
import { TOAST_TYPE } from '@src/core'

interface AppProps {
  message?: {
    value?: string
    type?: TOAST_TYPE
  }
}

const initialState: AppProps = {
  message: { value: undefined, type: TOAST_TYPE.FAILURE },
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionPushToast(state, action) {
      return {
        ...state,
        message: action.payload,
      }
    },
  },
})

export const { actionPushToast } = appSlice.actions
export default appSlice.reducer
