
import { useAppDispatch, useAppState } from '@src/app'
import { actionPushToast } from '@src/app/reducers/app.reducer'
import { TOAST_TYPE } from '@src/core/constants'
import { Colors, fontSize, horizontalScale, IconCheckError, IconCheckSuccess, verticalScale } from '@src/core/utils'
import React, { useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, Text } from 'react-native'

const ToastNotification = () => {
  const dispatch = useAppDispatch()
  const state = useAppState()
  const { app } = state || {}
  const { message } = app
  const { value, type } = message || {}
  useEffect(() => {
    let timeout: any = null
    if (message) {
      timeout = setTimeout(() => {
        dispatch(actionPushToast(''))
      }, 3000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [dispatch, message])

  if (!value) return <></>
  const isSuccess = type === TOAST_TYPE.SUCCESS
  const backgroundColor = isSuccess ? Colors.rgbaB4F6D8 : Colors.rgbaD2232A
  const color = isSuccess ? Colors.h29835A : Colors.hD8394C
  return (
    <SafeAreaView style={styles.areaView}>
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.viewBase}>
          {isSuccess ? <IconCheckSuccess /> : <IconCheckError />}
          <Text numberOfLines={3} style={[styles.title, { color }]} >{value}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default ToastNotification
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    marginHorizontal: horizontalScale(30),
    paddingLeft: horizontalScale(15),
    borderRadius: horizontalScale(8),
    marginBottom: verticalScale(20),
  },
  areaView: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  title: {
    flex: 1,
    fontSize: fontSize(14),
    marginLeft: horizontalScale(10),
  },
  viewBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewClose: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(15),
  },
})
