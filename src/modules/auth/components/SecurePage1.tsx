import { Button, Colors, Fonts, fontSize, horizontalScale, IconSuccess, UILabel } from '@src/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Dimensions, Text } from 'react-native'

const { width } = Dimensions.get('window')

interface IProps {
  onStart?: () => void
}

const SecurePage1 = (props: IProps) => {
  const { t } = useTranslation()
  const { onStart } = props
  return (
    <View style={styles.flex}>
      <UILabel.Gradient style={styles.title}>{t('secure_password')}</UILabel.Gradient>
      <Text style={styles.title2}>{t('title_secure3')} <Text style={styles.colorHighlight}>{t('word_phrase')}</Text></Text>
      {/* manual */}
      <View style={styles.row}>
        <IconSuccess />
        <Text style={styles.textCategory}>{t('manual')}:</Text>
      </View>
      <Text style={styles.textLabel}>{t('title_manual')}</Text>
      {/* security */}
      <View style={[styles.row, styles.marginTop]}>
        <IconSuccess />
        <Text style={styles.textCategory}>{t('security_level')}: <Text style={styles.colorHighlight}>{t('very_strong')}</Text></Text>
      </View>
      <View style={styles.row}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
      {/* risk */}
      <View style={styles.row}>
        <IconSuccess />
        <Text style={styles.textCategory}>{t('risk_are')}:</Text>
      </View>
      <Text style={styles.textLabel}>{t('title_risk1')}</Text>
      <Text style={styles.textLabel}>{t('title_risk2')}</Text>
      <Text style={styles.textLabel}>{t('title_risk3')}</Text>
      {/* opinion */}
      <View style={styles.row}>
        <IconSuccess />
        <Text style={styles.textCategory}>{t('other_opinion')}:</Text>
      </View>
      <Text style={styles.textLabel}>{t('title_other_opinion')}</Text>
      {/* tips */}
      <View style={styles.row}>
        <IconSuccess />
        <Text style={styles.textCategory}>{t('tips')}:</Text>
      </View>
      <Text style={styles.textLabel}>{t('title_tips1')}</Text>
      <Text style={styles.textLabel}>{t('title_tips2')}</Text>
      <Text style={styles.textLabel}>{t('title_tips3')}</Text>

      <Button.Main
        label={t('start')}
        container={styles.btn}
        onPress={onStart}
      />
    </View>
  )
}

export default SecurePage1

SecurePage1.defaultProps = {
  onStart: () => { }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width,
    paddingHorizontal: horizontalScale(22),
    paddingTop: horizontalScale(30)
  },
  title: {
    fontSize: fontSize(20),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title2: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica,
    lineHeight: fontSize(24),
    textAlign: 'center',
    marginTop: horizontalScale(10),
    marginBottom: horizontalScale(30),
    color: Colors.h151515
  },
  colorHighlight: {
    color: Colors.h1E65FF
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: horizontalScale(10)
  },
  textCategory: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica_Bold,
    lineHeight: fontSize(24),
    color: Colors.h151515,
    marginLeft: horizontalScale(10)
  },
  textLabel: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica,
    lineHeight: fontSize(24),
    color: Colors.h151515,
  },
  marginTop: {
    marginTop: horizontalScale(18)
  },
  line: {
    width: horizontalScale(40),
    height: horizontalScale(2),
    backgroundColor: Colors.h29CD7E,
    marginRight: horizontalScale(8),
    marginTop: horizontalScale(6)
  },
  btn: {
    marginVertical: horizontalScale(30)
  }
})
