import { Button, Colors, Container, Fonts, fontSize, Form, horizontalScale, registerSchema, Screens, UILabel } from '@src/core'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Text } from 'react-native'
import { yupResolver as FormResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'

interface registerForm {
  newPassword: string
  confirmPassword: string
}

const RegisterWallet = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [isAccept, setAccept] = useState(false)
  const form = useForm<registerForm>({
    defaultValues: {},
    mode: 'onChange',
    resolver: FormResolver(registerSchema()),
  })

  const onAcceptTerm = () => {
    setAccept(!isAccept)
  }

  const onCreate = () => {
    navigation.navigate(Screens.SECURE_WALLET)
  }

  return (
    <Container.Main
      headerShow
      step={1}
    >
      <View style={styles.content}>
        <UILabel.Gradient style={styles.title}>{t('title_register')}</UILabel.Gradient>
        <Text style={styles.title1}>{t('title_register1')}</Text>

        <FormProvider {...form}>
          <Form.PasswordInput
            name="newPassword"
            label={t('new_password')}
            containerStyle={styles.password}
            style={styles.input}
            labelStyle={styles.label}
            isOptional
            placeholder={t('set_password')}
            contentStyle={styles.contentInput}
          />
          <Form.PasswordInput
            name="confirmPassword"
            label={t('confirm_pass')}
            containerStyle={styles.confirmPass}
            style={styles.input}
            labelStyle={styles.label}
            isOptional
            placeholder={t('set_password')}
            contentStyle={styles.contentInput}
          />
        </FormProvider>

        <View style={styles.viewTerm}>
          <Button.Select
            value={isAccept}
            onPress={onAcceptTerm}
          />
          <Text style={styles.textTerm}>{t('term_of_service')}<Text style={styles.colorHighlight}>{` ${t('learn_more')}`}</Text></Text>
        </View>

        <View style={styles.viewBtn}>
          <Button.Main
            label={t('create_password')}
            container={form.formState.isValid && isAccept ? {} : styles.btnCreate}
            labelStyle={form.formState.isValid && isAccept ? {} : styles.btnLabel}
            disabled={!(form.formState.isValid && isAccept)}
            onPress={onCreate}
          />
        </View>
      </View>

    </Container.Main>
  )
}

export default RegisterWallet

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: horizontalScale(20),
    backgroundColor: Colors.hFFFFFF,
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    paddingHorizontal: horizontalScale(22),
    paddingTop: horizontalScale(30)
  },
  title: {
    fontSize: fontSize(20),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title1: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    textAlign: 'center',
    color: Colors.h656565,
    marginTop: horizontalScale(10)
  },
  flex: {
    flex: 1
  },
  password: {
    marginTop: horizontalScale(29)
  },
  confirmPass: {
    marginTop: horizontalScale(17)
  },
  input: {
    fontFamily: Fonts.Helvetica,
    fontSize: fontSize(14),
    backgroundColor: Colors.hFFFFFF
  },
  label: {
    fontFamily: Fonts.Helvetica,
    fontSize: fontSize(14),
    fontWeight: '700'
  },
  contentInput: {
    backgroundColor: Colors.hFFFFFF,
    borderWidth: 1,
    borderColor: Colors.hE3E3E3
  },
  viewTerm: {
    flexDirection: 'row',
    marginTop: horizontalScale(30),
    alignItems: 'center'
  },
  textTerm: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    lineHeight: fontSize(22),
    color: Colors.h151515,
    marginLeft: horizontalScale(14)
  },
  colorHighlight: {
    color: Colors.h1E65FF
  },
  btnCreate: {
    backgroundColor: Colors.hE3E3E3
  },
  btnLabel: {
    color: Colors.rgba656565
  },
  viewBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: horizontalScale(34)
  }
})