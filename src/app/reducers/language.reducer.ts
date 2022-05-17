import { createSlice } from '@reduxjs/toolkit'

interface LanguageProps {
  language?: string
}

const initialState: LanguageProps = {
  language: 'en'
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    actionSetLanguage(state, action) {
      return {
        ...state,
        language: action.payload
      }
    }
  }
})

export const { actionSetLanguage } = languageSlice.actions
export default languageSlice.reducer
