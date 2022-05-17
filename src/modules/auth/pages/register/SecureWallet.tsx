import { useNavigation } from '@react-navigation/native'
import { Colors, Container, horizontalScale, Screens } from '@src/core'
import React, { useRef } from 'react'
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native'
import { SecurePage, SecurePage1 } from '../../components'

const { width } = Dimensions.get('window')

const SecureWallet = () => {
  const refSlide = useRef<ScrollView>(null)
  const navigation = useNavigation()
  const onStartPage = () => {
    refSlide.current?.scrollTo({ x: width, y: 0 })
  }

  const onNextStep = () => {
    navigation.navigate(Screens.CONFIRM_PHRASE)
  }

  return (
    <Container.Main
      headerShow
      step={2}
    >
      <View style={styles.content}>
        <ScrollView
          ref={refSlide}
          pagingEnabled
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          scrollEnabled={false}
        >
          <SecurePage onStart={onStartPage} onRemind={onStartPage} />
          <SecurePage1 onStart={onNextStep} />
        </ScrollView>
      </View>
    </Container.Main>
  )
}

export default SecureWallet

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: horizontalScale(20),
    backgroundColor: Colors.hFFFFFF,
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30)
  }
})