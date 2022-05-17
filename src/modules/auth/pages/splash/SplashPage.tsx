import { useNavigation } from '@react-navigation/native'
import { Colors, horizontalScale, Screens } from '@src/core'
import React, { useRef, useState } from 'react'
import { StyleSheet, View, StatusBar, Dimensions, I18nManager, ScrollView, Platform } from 'react-native'
import { Slide } from '../../components'
import { dataSlide } from '../../constants/auth.contants'

const isAndroidRTL = I18nManager.isRTL && Platform.OS === 'android'
const { width } = Dimensions.get('window')
const paddingDot = (width - horizontalScale(24)) / 2
const SplashPage = () => {
  const refSlide = useRef<ScrollView>(null)
  const [dotActive, setActive] = useState(0)
  const rtlSafeIndex = (i: number) => (isAndroidRTL ? dataSlide.length - 1 - i : i)
  const navigation = useNavigation()

  const onMomentumScrollEnd = (e: any) => {
    const offset = e.nativeEvent.contentOffset.x
    const newIndex = rtlSafeIndex(Math.round(offset / width))
    if (newIndex === dotActive) {
      // No page change, don't do anything
      return
    }
    setActive(newIndex)
  }
  const onNext = (index: number) => {
    const widthScroll = width * (index + 1)
    if (index !== 2) {
      refSlide.current?.scrollTo({ x: widthScroll, y: 0 })
      setActive(index + 1)
    } else {
      navigation.navigate(Screens.LOGIN)
    }
  }

  const onBack = (index: number) => {
    const widthScroll = width * (index - 1)
    refSlide.current?.scrollTo({ x: widthScroll, y: 0 })
    setActive(index - 1)
  }

  const onSkip = () => {
    navigation.navigate(Screens.LOGIN)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.slider}>
        <ScrollView
          ref={refSlide}
          pagingEnabled
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onMomentumScrollEnd={onMomentumScrollEnd}
        >
          {
            dataSlide.map(({ imageSlide, type, title }, index) => {
              return (
                <Slide key={index.toString()} {...{ imageSlide, type, title, index, onNext, onBack, onSkip }} />
              )
            })
          }
        </ScrollView>
        <View style={styles.viewDot}>
          {
            dataSlide.map((_item, index) => {
              return (
                <View key={index.toString()} style={[styles.dot, { backgroundColor: index === dotActive ? Colors.hFFFFFF : 'transparent' }]} />
              )
            })
          }
        </View>
      </View>
    </View>
  )
}

export default SplashPage

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slider: {
    flex: 1,
  },
  dot: {
    width: horizontalScale(8),
    height: horizontalScale(8),
    borderRadius: horizontalScale(4),
    marginLeft: horizontalScale(6),
    borderWidth: 2,
    borderColor: Colors.hBABABA
  },
  viewDot: {
    position: 'absolute',
    top: '50%',
    left: paddingDot,
    flexDirection: 'row'
  }
})
