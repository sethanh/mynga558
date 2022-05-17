import React, { useState } from 'react'
import { StyleSheet, View, Text, ImageBackground} from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  Colors, Container, Fonts, fontSize, horizontalScale, verticalScale, IMAGE, IconSeedStar, Button, TOAST_TYPE
} from '@src/core'
import CodeInput from 'react-native-confirmation-code-input'
import { useDispatch } from 'react-redux'
import { actionPushToast } from '@src/app/reducers/app.reducer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { recoveryConst} from '../../constants'

const RecoverySeedPhrase = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [code, setCode] = useState<string>('')
  const {dataPhrase,authenCode}= recoveryConst
  const [showPhrase, setShowPhrase] = useState(false)
  const onFulfill = (code: any) => {
    setCode(code)
  }

  const onSubmit = () => {
    if (code===authenCode) {
      setShowPhrase(true)
    }
    else {
      dispatch(actionPushToast({ value: t('err_authen_recovery'), type: TOAST_TYPE.FAILURE }))
    }
  }

  const renderInforCardView = () => (
    <ImageBackground
      style={[styles.bgProfile, styles.marginTop]}
      source={IMAGE.BG_SEED_PHRASE}
      imageStyle={styles.imProfile}
    >
      <View style={[styles.row]}>
        <View style={styles.bgStar}>
          <IconSeedStar />
        </View>
        <Text style={[styles.txtHeadCard]}>{t('reveal_word_phrase')}</Text>
      </View>
      <Text style={[styles.txtDesCard]}>{t('des_seed_phrase_card')}</Text>
    </ImageBackground>
  )
  const renderPhraseItem = (item: string, index: number ) => (
      <View style={styles.itemPhrase} key={index}>
        <Text style={styles.textPhrase}>{`${index + 1}. ${item}`}</Text>
      </View>
  )
  const renderBtnCoppy=()=>(
    <Button.Main
    label={t('coppy')}
    container={styles.button}
    onPress={() => {}}
  />
  )

  const renderCodeInputView = () => (
    <View style={[styles.wrapperAuthenInput]}>
      <CodeInput
        className="border-b"
        space={horizontalScale(42)}
        codeLength={6}
        size={40}
        inputPosition='center'
        onFulfill={(code: any) => onFulfill(code)}
        keyboardType="numeric"
        containerStyle={styles.codeInput}
        inactiveColor={Colors.h151515}
        activeColor={Colors.hC2862F}
        codeInputStyle={styles.input}
      />
    </View>
  )
  const renderAuthenView = () => (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      {renderInforCardView()}
      <Text style={[styles.txtAuthen, styles.marginTop]}>{t('authentication_code')}</Text>
      {renderCodeInputView()}
      <Button.Main
        label={t('confirm')}
        container={styles.button}
        onPress={() => onSubmit()}
      />
    </KeyboardAwareScrollView>
  )
  const renderListPhraseView = () => (
    <View style={[styles.bgPhrase]}>
        {dataPhrase.map((item,index)=>(
          renderPhraseItem(item,index)
        ))}
    </View>
  )

  return (
    <Container.Main
      headerShow
      title={t('recovery_seed_phrase')}
    >
      <View style={styles.content}>
        <View>
          <Text style={[styles.title2]}>{t('here_seed_phrase')}</Text>
          <Text style={[styles.desFont]}>{t('des_seed_phrase')}</Text>
          {showPhrase&&renderListPhraseView()||renderAuthenView()}
        </View>
        {showPhrase&&renderBtnCoppy()}
      </View>
    </Container.Main>
  )
}

export default RecoverySeedPhrase

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.hFFFFFF,
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(34),
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    paddingHorizontal: horizontalScale(22),
    marginTop: verticalScale(24),
    flex: 1,
    justifyContent:'space-between'
  },
  font: {
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    color: Colors.h151515,
    fontFamily: Fonts.Helvetica,
  },
  desFont: {
    fontSize: fontSize(14),
    lineHeight: fontSize(22),
    fontFamily: Fonts.Helvetica,
    color: Colors.h656565,
    textAlign: 'center',
  },
  title: {
    fontFamily: Fonts.Helvetica_Bold,
  },
  title2: {
    fontSize: fontSize(20),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    lineHeight: fontSize(30),
    color: Colors.hC2862F,
    marginBottom: verticalScale(10)
  },
  bgProfile: {
    width: '100%',
    height: verticalScale(156),
    marginTop: verticalScale(8),
    paddingVertical: verticalScale(25),
  },
  imProfile: {
    borderRadius: 16
  },
  marginTop: {
    marginTop: verticalScale(30)
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: horizontalScale(18),
    alignItems: 'center'
  },
  txtHeadCard: {
    fontSize: fontSize(20),
    lineHeight: fontSize(30),
    color: Colors.hFFFFFF,
    fontFamily: Fonts.Helvetica_Bold,
    marginLeft: horizontalScale(10)
  },
  txtDesCard: {
    fontSize: fontSize(14),
    lineHeight: fontSize(22),
    color: Colors.hFFFFFF,
    fontFamily: Fonts.Helvetica,
    marginHorizontal: horizontalScale(18),
    marginTop: verticalScale(10)
  },
  bgStar: {
    width: horizontalScale(30),
    height: horizontalScale(30),
    backgroundColor: Colors.BASE_COLOR.WHITE,
    borderRadius: horizontalScale(15),
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtAuthen: {
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    color: Colors.h151515,
    fontFamily: Fonts.Helvetica_Bold,
    alignSelf: 'center'
  },
  button: {
    width: horizontalScale(200),
    marginTop: verticalScale(30),
    alignSelf: 'center'
  },
  wrapperAuthenInput: {
    borderColor: Colors.hE3E3E3,
    borderWidth: 1,
    height: verticalScale(48),
    width: '100%',
    borderRadius: 30,
  },
  codeInput: {
    paddingHorizontal: 10,
    borderRadius: 30,
    paddingBottom: 20,
    marginTop: 0,
  },
  input: {
    color: Colors.h151515,
    width: horizontalScale(9),
    alignSelf:'center',
    height: verticalScale(48),
    paddingTop: verticalScale(15)
  },
  bgPhrase: {
    borderWidth: 1,
    borderColor: Colors.hCC8C33,
    borderRadius: horizontalScale(30),
    marginTop: horizontalScale(12),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(14),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between'
  },
  itemPhrase: {
    width: horizontalScale(136),
    height: horizontalScale(48),
    backgroundColor: Colors.hF5F5F5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: horizontalScale(24),
    marginVertical: verticalScale(6)
  },
  textPhrase: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica,
    color: Colors.h151515
  }
})
