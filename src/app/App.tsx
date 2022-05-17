import { Screens, getLanguare, Translator } from '@src/core'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch } from 'react-redux'
import AppNavigation from './navigation'
import { Toast } from '../core/components'
import { actionSetLanguage } from './reducers'

const App = () => {
  const [initialRouteName,] = useState(Screens.HOMEPAGE)
  const dispatch = useDispatch()

  useEffect(() => {
    SplashScreen.hide()

      ; (async () => {
        const saveLag = await getLanguare()
        Translator.changeLanguages(saveLag || 'en')
        dispatch(actionSetLanguage(saveLag || 'en'))
      })()
  }, [dispatch])

  return (
    <View style={styles.container}>
      <AppNavigation initialRouteName={initialRouteName} />
      <Toast.Notification />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})