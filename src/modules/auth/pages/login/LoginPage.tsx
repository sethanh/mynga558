import { Button, Colors, Container, Fonts, fontSize, horizontalScale, IMAGE, Screens } from '@src/core'
import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

const LoginPage = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const handleNavigator = (screen: string) => {
    navigation.navigate(screen)
  }

  const onRegister = () => {
    handleNavigator(Screens.REGISTER_WALLET)
  }

  const onRecovery = () => {
    handleNavigator(Screens.RECOVERY_WALLET)
  }

  return (
    <Container.Main
    >
      <Image
        style={styles.imgLogin}
        source={IMAGE.BG_LOGIN}
        resizeMode='contain'
      />
      <View style={styles.content}>
        <View style={styles.viewInfo}>
          <Text style={styles.title1}>{t('welcome_to')}</Text>
          <Text style={styles.title2}>THE mynga558</Text>
          <Button.Gradient
            onPress={onRegister}
            label={t('create_wallet')}
            container={styles.marginTop}
          />
          <Button.Main
            label={t('have_wallet')}
            container={styles.marginTop}
            onPress={onRecovery}
          />
          <View style={styles.viewOr}>
            <View style={styles.viewLine} />
            <Text style={styles.textOr}>{`\t${t('or')}\t`}</Text>
            <View style={styles.viewLine} />
          </View>
          <Button.Main
            label={t('login_email')}
            container={styles.btnLoginEmail}
            labelStyle={styles.textLabel}
          />
        </View>
      </View>
    </Container.Main>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  imgLogin: {
    width: horizontalScale(265),
    height: horizontalScale(265),
    alignSelf: 'center',
    marginTop: horizontalScale(70)
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  viewInfo: {
    backgroundColor: Colors.hFFFFFF,
    paddingTop: horizontalScale(24),
    paddingBottom: horizontalScale(34),
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    paddingHorizontal: horizontalScale(22)
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
    marginTop: horizontalScale(18)
  },
  viewOr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: horizontalScale(18)
  },
  viewLine: {
    width: horizontalScale(80),
    height: horizontalScale(1),
    backgroundColor: Colors.hE3E3E3
  },
  textOr: {
    fontSize: horizontalScale(16),
    fontFamily: Fonts.Helvetica,
    color: Colors.h151515
  },
  btnLoginEmail: {
    backgroundColor: Colors.hFFFFFF,
    borderWidth: 1,
    borderColor: Colors.h151515
  },
  textLabel: {
    color: Colors.h151515
  }
})