import React from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import store from './store'
import { i18n } from './config'

const AppProvider = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  )
}

export default AppProvider
