import { Button, Colors, Fonts, fontSize, horizontalScale } from '@src/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Dimensions, Text } from 'react-native'

const { width } = Dimensions.get('window')
interface SubSlideProps {
  title: string;
  type: number;
  onNextPage: () => void;
}

const SubSlide = ({ title, type, onNextPage }: SubSlideProps) => {
  const { t } = useTranslation()
  return (
    <View style={styles.content}>
      {
        type === 0 ? (
          <Text style={styles.title1}>A completely new way to invest with <Text style={styles.colorHighLight}>THE mynga558</Text></Text>
        ) : type === 1 ? <Text style={styles.title2}>Safe security <Text style={styles.colorBlack}>is always highly appreciated</Text></Text>
          : <Text style={styles.title1}>Satisfied with <Text style={styles.colorHighLight}>convenient transactions</Text></Text>
      }
      <Text style={styles.description}>{title}</Text>

      <View style={styles.viewBtn}>
        <Button.Main
          onPress={onNextPage}
          label={type !== 2 ? t('next') : t('get_started')}
        />
      </View>
    </View>
  )
}

export default SubSlide

const styles = StyleSheet.create({
  content: {
    width: width * 0.8826,
    backgroundColor: Colors.hFFFFFF,
    marginHorizontal: horizontalScale(22),
    borderRadius: horizontalScale(30),
    paddingVertical: horizontalScale(20)
  },
  title1: {
    fontSize: fontSize(32),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    color: Colors.h151515
  },
  title2: {
    fontSize: fontSize(32),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    color: Colors.hBB7C2C
  },
  colorHighLight: {
    color: Colors.hC2862F
  },
  colorBlack: {
    color: Colors.h151515
  },
  description: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica,
    textAlign: 'center',
    marginHorizontal: horizontalScale(20),
    marginTop: horizontalScale(12)
  },
  viewBtn: {
    paddingHorizontal: horizontalScale(65),
    marginTop: horizontalScale(30)
  }
})
