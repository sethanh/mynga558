import React from 'react'
import { StyleSheet,  View, Text} from 'react-native'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from "react-hook-form"
import {
  Button,
  Colors,
  Container,
  Fonts,
  fontSize,
  horizontalScale,
  Form,
  verticalScale,
  changePasswordSchema
} from '@src/core'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { yupResolver as FormResolver } from '@hookform/resolvers/yup'

interface FormValues {
  password: string,
  newPassword: string,
  confirmPassword: string
}

const ChangePassword = () => {
  const { t } = useTranslation()
  const form = useForm<FormValues>({
    defaultValues: {},
    mode: 'onChange',
    resolver: FormResolver(changePasswordSchema()),
  })

  const renderInputView = (name: string, label: string) => (
    <Form.PasswordInput
      name={name}
      label={t(label)}
      labelStyle={[styles.title, styles.font]}
      contentStyle={[styles.inputStyle]}
      containerStyle={styles.containerStyle}
      style={styles.txtInput}
    />
  )

  return (
    <Container.Main
      headerShow
      title={t('change_password')}
    >
      <View style={styles.content}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={[styles.desEdit, styles.font]}>{t('des_change_password')}</Text>
            <FormProvider {...form}>
              {renderInputView('password', 'current_password')}
              {renderInputView('newPassword', 'new_password')}
              {renderInputView('confirmPassword', 'confirm_new_password')}
            </FormProvider>
          </View>
        </KeyboardAwareScrollView>
        <Button.Main
          label={t('confirm')}
          container={styles.marginTop}
          onPress={() => { }}
        />
      </View>
    </Container.Main>
  )
}

export default ChangePassword

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
    justifyContent: 'space-between'
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
    marginBottom: verticalScale(23)
  },
  title: {
    paddingLeft: horizontalScale(18),
    fontFamily: Fonts.Helvetica_Bold,
  },
  titleAdd: {
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    marginTop: verticalScale(14),
    marginBottom: verticalScale(23)
  },
  marginTop: {
    marginTop: verticalScale(18)
  },
  textLabel: {
    color: Colors.h151515
  },
  inputStyle: {
    backgroundColor: Colors.BASE_COLOR.WHITE,
    borderColor: Colors.hE3E3E3,
    borderWidth: 1,
    height: verticalScale(48),
  },
  containerStyle:{
    marginBottom: verticalScale(17),
  },
  txtInput: {
    color: Colors.h151515
  }
})
