import { Button, Colors, Container, Fonts, fontSize, horizontalScale, verticalScale, IMAGE, Screens } from '@src/core'
import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

const RecoveryWallet = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const handleNavigator = (screen: string) => {
    navigation.navigate(screen)
  }

  return (
    <Container.Main
      headerShow
      title={t('recovery_wallet')}
    >
      <Image
        style={styles.imgRecovery}
        source={IMAGE.BG_RECOVERY}
        resizeMode='contain'
      />
      <View style={styles.content}>
        <View style={[styles.viewInfo, styles.paddingBottom]}>
          <Text style={styles.title1}>{`😉\n${t('let_recovery')}`}</Text>
          <Text style={styles.title2}>{t('your_wallet')}</Text>

          <Button.Gradient
            label={t('google_driver')}
            container={styles.marginTop}
            onPress={() => handleNavigator(Screens.CONFIRM_WALLET)}
          />
          <Button.Main
            label={t('add_manualy')}
            container={styles.marginTop}
            onPress={() => handleNavigator(Screens.CONFIRM_WALLET)}
          />
        </View>
      </View>
    </Container.Main>
  )
}

export default RecoveryWallet

const styles = StyleSheet.create({
  imgRecovery: {
    width: horizontalScale(362),
    height: verticalScale(360),
    alignSelf: 'center',
    marginTop: verticalScale(46),
    marginLeft: horizontalScale(13)
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  viewInfo: {
    backgroundColor: Colors.hFFFFFF,
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(34),
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    paddingHorizontal: horizontalScale(24)
  },
  title1: {
    fontSize: fontSize(32),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    lineHeight: fontSize(42)
  },
  title2: {
    fontSize: fontSize(32),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    lineHeight: fontSize(42),
    color: Colors.hC2862F
  },
  marginTop: {
    marginTop: verticalScale(18)
  },
  paddingBottom: {
    paddingBottom: verticalScale(100)
  },
  textLabel: {
    color: Colors.h151515
  }
})