import { Button, Colors, Container, Fonts, fontSize, horizontalScale, verticalScale, IMAGE, Screens } from '@src/core'
import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

const SuccessWallet = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <Container.Main
    >
      <Image
        style={styles.imgRecovery}
        source={IMAGE.BG_RECOVERY}
        resizeMode='contain'
      />
      <View style={styles.content}>
        <View style={[styles.viewInfo, styles.paddingBottom]}>
          <Image
            style={styles.imgSuccess}
            source={IMAGE.BG_SUCCESS}
            resizeMode='contain'
          />
          <Text style={[styles.title2, styles.marginTop]}>{`${t('success')}!`}</Text>
          <Text style={[styles.titleDes, styles.marginTop]}>{`${t('des_success')}!`}</Text>

          <Button.Main
            onPress={() => navigation.navigate(Screens.HOMEPAGE)}
            label={t('next')}
            container={styles.marginTop}
          />
        </View>
      </View>
    </Container.Main>
  )
}

export default SuccessWallet

const styles = StyleSheet.create({
  imgRecovery: {
    width: horizontalScale(362),
    height: verticalScale(360),
    alignSelf: 'center',
    marginTop: verticalScale(14),
    marginLeft: horizontalScale(13)
  },
  imgSuccess: {
    width: horizontalScale(124.51),
    height: verticalScale(106.8),
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  viewInfo: {
    backgroundColor: Colors.hFFFFFF,
    paddingVertical: verticalScale(92),
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    paddingHorizontal: horizontalScale(24)
  },
  titleDes: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica,
    textAlign: 'center',
    lineHeight: fontSize(24),
    fontWeight: '400'
  },
  title2: {
    fontSize: fontSize(32),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    lineHeight: fontSize(42),
    color: Colors.hC2862F,

  },
  marginTop: {
    marginTop: verticalScale(24)
  },
  paddingBottom: {
    paddingBottom: verticalScale(100)
  },
  textLabel: {
    color: Colors.h151515
  }
})