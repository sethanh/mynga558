import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import ToggleSwitch from 'toggle-switch-react-native'
import {
  Button, Colors, Container, Fonts, fontSize, getConnectGoogle, setConnectGoogle,
  horizontalScale, verticalScale, Modal, IconFinger, getPinSecurity, setPinSecurity
} from '@src/core'
import CodeInput from 'react-native-confirmation-code-input'
import TouchID from 'react-native-touch-id'
import { securityConst } from '../../constants'

const SecurityPage = () => {
  const { t } = useTranslation()
  const [connect, setConnect] = useState<boolean>(false)
  const [pin, setPin] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [code, setCode] = useState<string>('')
  const { optionalConfigObject } = securityConst

  useEffect(() => {
    ; (async () => {
      const connectGoogle = await getConnectGoogle()
      const pinSecurity = await getPinSecurity()
      connectGoogle && setConnect(Boolean(connectGoogle))
      pinSecurity && setPin(Boolean(securityConst))
    })()
  }, [])

  const handleConnectGoogle = (value: boolean) => {
    setConnectGoogle(!value)
    setConnect(!value)
  }

  const onSetActivePin = (value: boolean) => {
    setPinSecurity(value)
    setPin(value)
  }

  const handleCreatePin = (value: boolean) => {
    if (value) {
      onSetActivePin(false)
    }
    else {
      setShowModal(true)
    }
  }

  const onFulfill = (code: any) => {
    setCode(code)
  }

  const onHandleTouch = () => {
    TouchID.isSupported().then(
      TouchID.authenticate('Touch id', optionalConfigObject)
        .then(() => {
          setShowModal(false)
          onSetActivePin(true)
        })
        .catch(() => {
          setShowModal(false)
          onSetActivePin(false)
        })
    ).catch(error => {
      console.log(error)
    })
  }

  const onSubmit = () => {
    if (code) {
      setShowModal(false)
      onSetActivePin(true)
    }
  }

  const renderItem = (label: string, isOn: boolean, funtion?: () => void) => (
    <ToggleSwitch
      isOn={isOn}
      onColor={Colors.h96481B}
      offColor={Colors.hFFFFFF}
      label={t(label)}
      labelStyle={styles.labelStyle}
      thumbOnStyle={styles.thumOnStyle}
      thumbOffStyle={styles.thumOffStyle}
      size="small"
      onToggle={funtion}
      trackOffStyle={styles.trackoffStyle}
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
  const renderOptionsView = () => (
    <View style={styles.option}>
      <Text style={styles.title}>{t('enter_your_pin')}</Text>
      {renderCodeInputView()}
      <Button.Main
        label={t('confirm')}
        container={styles.button}
        onPress={() => onSubmit()}
      />
      <TouchableOpacity style={styles.row} onPress={() => onHandleTouch()}>
        <IconFinger />
        <Text style={[styles.txtFinger]}>{t('finger_pin')}</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <Container.Main
      headerShow
      title={t('security')}
    >
      <View style={styles.content}>
        {renderItem('connect_google_authen', connect, () => handleConnectGoogle(connect))}
        <View style={styles.line} />
        {renderItem('create_pin', pin, () => handleCreatePin(pin))}
        <View style={styles.line} />
      </View>
      <Modal.Dark visible={showModal} onCloseModal={() => setShowModal(false)}>
        {renderOptionsView()}
      </Modal.Dark>
    </Container.Main>
  )
}

export default SecurityPage

const styles = StyleSheet.create({
  imgLogin: {
    width: horizontalScale(265),
    height: horizontalScale(265),
    alignSelf: 'center',
    marginTop: horizontalScale(70)
  },
  content: {
    backgroundColor: Colors.hFFFFFF,
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(34),
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    paddingHorizontal: horizontalScale(22),
    marginTop: verticalScale(24),
    flex: 1
  },
  font: {
    fontSize: fontSize(14),
    lineHeight: fontSize(22),
    color: Colors.h656565
  },
  desEdit: {
    fontFamily: Fonts.Helvetica,
    textAlign: 'center',
    fontWeight: '400',
  },
  title: {
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    color: Colors.h151515,
    fontFamily: Fonts.Helvetica_Bold,
    alignSelf: 'center',
    marginBottom: verticalScale(12),
    marginLeft: horizontalScale(14)
  },
  thumOnStyle: {
    backgroundColor: Colors.hFFFFFF
  },
  thumOffStyle: {
    backgroundColor: Colors.h96481B
  },
  trackoffStyle: {
    borderColor: Colors.h96481B,
    borderWidth: 1,
  },
  labelStyle: {
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    color: Colors.h151515,
    fontFamily: Fonts.Helvetica,
    fontWeight: '400',
    flex: 1
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.hE3E3E3,
    marginVertical: verticalScale(21)
  },
  option: {
    width: '100%',
    backgroundColor: Colors.BASE_COLOR.WHITE,
    position: 'absolute',
    top: verticalScale(210),
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(22)
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
    alignSelf: 'center',
    height: verticalScale(48),
    paddingTop: verticalScale(15)
  },
  button: {
    width: horizontalScale(200),
    marginVertical: verticalScale(30),
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtFinger: {
    color: Colors.h96481B,
    fontFamily: Fonts.Helvetica,
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    fontWeight: '400',
    marginLeft: horizontalScale(12)
  }
})
