import { Colors, Fonts, fontSize, horizontalScale, IconBack } from '@src/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, ImageBackground, ImageSourcePropType, Dimensions, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SubSlide from './SubSlde'

const { width, height } = Dimensions.get('window')
interface SlideProps {
  imageSlide: ImageSourcePropType;
  type: number;
  title: string;
  onNext: (index: number) => void;
  index: number;
  onBack: (index: number) => void;
  onSkip: () => void;
}

const Slide = ({ imageSlide, type, title, index, onNext, onBack, onSkip }: SlideProps) => {
  const { t } = useTranslation()
  return (
    <View style={styles.flex}>
      <ImageBackground
        style={styles.imgBackground}
        source={imageSlide}
      >
        <View style={[styles.content, { justifyContent: type !== 0 ? 'space-between' : 'flex-end' }]}>
          {
            type !== 0 &&
            <TouchableOpacity
              onPress={() => onBack(index)}
            >
              <IconBack />
            </TouchableOpacity>
          }

          <TouchableOpacity
            onPress={onSkip}
          >
            <Text style={styles.label}>{t('skip')}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <SubSlide {...{ type, title }} onNextPage={() => onNext(index)} />
      </View>
    </View>
  )
}

export default Slide

const styles = StyleSheet.create({
  imgBackground: {
    width,
    height: height * 0.5837
  },
  content: {
    marginHorizontal: horizontalScale(24),
    marginTop: horizontalScale(60),
    flexDirection: 'row',
  },
  label: {
    color: Colors.hFFFFFF,
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica_Bold
  },
  footer: {
    flex: 1,
    backgroundColor: 'black'
  },
  flex: {
    flex: 1
  }
})
