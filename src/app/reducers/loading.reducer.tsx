import { createSlice } from '@reduxjs/toolkit'

interface LoadingProps {
  isLoading?: boolean
}

const initialState: LoadingProps = {
  isLoading: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading(state) {
      return {
        ...state,
        isLoading: true,
      }
    },
    hideLoading(state) {
      return {
        ...state,
        isLoading: false,
      }
    },
  }
})

export const { showLoading, hideLoading } = loadingSlice.actions
export default loadingSlice.reducer
