import { useNavigation } from '@react-navigation/native'
import { Colors, Container, horizontalScale, Screens } from '@src/core'
import React, { useRef } from 'react'
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native'
import { ConfirmPhrasePage, ConfirmPhrase1 } from '../../components'

const { width } = Dimensions.get('window')

const ConfirmPhrase = () => {
  const refSlide = useRef<ScrollView>(null)
  const navigation = useNavigation()
  const onNextPage = () => {
    navigation.navigate(Screens.REGISTER_SUCCESS)
  }

  const onNextStep = () => {
    refSlide.current?.scrollTo({ x: width, y: 0 })
  }

  return (
    <Container.Main
      headerShow
      step={3}
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
          <ConfirmPhrasePage onPress={onNextStep} />
          <ConfirmPhrase1 onPress={onNextPage} />
        </ScrollView>
      </View>
    </Container.Main>
  )
}

export default ConfirmPhrase

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: horizontalScale(20),
    backgroundColor: Colors.hFFFFFF,
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30)
  }
})