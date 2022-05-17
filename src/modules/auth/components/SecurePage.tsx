import { Button, Colors, Fonts, fontSize, horizontalScale, IMAGE, UILabel } from '@src/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native'

const { width } = Dimensions.get('window')

interface IProps {
  onStart?: () => void
  onRemind?: () => void
}

const SecurePage = (props: IProps) => {
  const { t } = useTranslation()
  const { onStart, onRemind } = props

  return (
    <View style={styles.flex}>
      <Image
        style={styles.bg}
        source={IMAGE.BG_REGISTER}
        resizeMode='contain'
      />
      <UILabel.Gradient style={styles.title}>{t('secure_password')}</UILabel.Gradient>
      <Text style={styles.description}>{t('title_secure')}<Text style={styles.colorHighlight}> {t('seed_phrase')} </Text>{t('title_secure1')}</Text>
      <Text style={styles.description}>{t('title_secure2')}</Text>

      <View style={styles.viewBtn}>
        <Button.Gradient
          label={t('start')}
          onPress={onStart}
        />
        <Button.Main
          label={t('remind_me')}
          container={styles.btnRemind}
          onPress={onRemind}
        />
      </View>
    </View>


  )
}

export default SecurePage

SecurePage.defaultProps = {
  onStart: () => { },
  onRemind: () => { }
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
    marginVertical: horizontalScale(30),
    fontWeight: 'bold'
  },
  bg: {
    width: horizontalScale(200),
    height: horizontalScale(200),
    alignSelf: 'center'
  },
  description: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica,
    textAlign: 'center',
    marginBottom: horizontalScale(14),
    color: Colors.h151515,
    lineHeight: horizontalScale(22)
  },
  colorHighlight: {
    color: Colors.h1E65FF
  },
  viewBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: horizontalScale(34)
  },
  btnRemind: {
    marginTop: horizontalScale(18)
  }
})
