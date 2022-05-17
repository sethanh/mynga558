import React, { useState } from 'react'
import { Button, Colors, Container, Fonts, fontSize, horizontalScale, verticalScale, Form, Screens } from '@src/core'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from "react-hook-form"
import { useNavigation } from '@react-navigation/native'
import { listPhrase, validates } from "../../constants"

interface FormValues {
  name: string
}

const ConfirmWallet = () => {
  const { t } = useTranslation()
  const [listInput, setListInput] = useState(listPhrase)
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()

  const form = useForm<FormValues>({
    defaultValues: {},
    mode: 'onChange',
  })

  const handleNavigator = (screen: string) => {
    navigation.navigate(screen)
  }

  const onSubmit = (data: FormValues) => {
    console.log(data)
    handleNavigator(Screens.SUCCESS_WALLET)

  }

  const updateListInput = (id: number, type: boolean) => {
    const data = listInput.map((obj, index) => {
      if (index === id) {
        return { ...obj, status: !!type }
      }
      return { ...obj }
    })
    setListInput(data)
  }

  const checkDisabled = () => {
    const res = listInput.filter((obj) => obj.status === false)
    res.length === 1 && setIsDisabled(false)
  }

  const onValidate = (id: number, e: any) => {
    const { nativeEvent } = e
    const { text } = nativeEvent
    if (text === validates[id]) {
      checkDisabled()
      updateListInput(id, true)
    }
    else {
      updateListInput(id, false)
      !isDisabled && setIsDisabled(true)
    }
  }

  const renderItemInput = ({ item }: any) => (
    <Form.TextInput
      name={`Word${item.name}`}
      label={`Word  ${item.name}`}
      containerStyle={styles.bgInput}
      labelStyle={styles.labelInput}
      contentStyle={styles.inputStyle}
      check={listInput[item.id].status}
      onChange={(e) => onValidate(item.id, e)}
    />
  )

  return (
    <Container.Main
      headerShow
    >
      <Text style={[styles.title1]}>{t('header_confirm_wallet')}</Text>
      <Text style={[styles.title2, styles.marginTop]}>{t('des_confirm_wallet')}</Text>

      <View style={styles.content}>
        <View style={styles.viewInfo}>
          <View style={styles.wrapperFlatlist}>
            <FormProvider {...form}>
              <FlatList
                data={listInput}
                numColumns={2}
                renderItem={renderItemInput}
                showsVerticalScrollIndicator={false}
              />
            </FormProvider>
          </View>

          <Button.Main
            label={t('next')}
            container={isDisabled ? styles.btnDisabled : {}}
            labelStyle={isDisabled ? styles.txtDisabled : {}}
            onPress={form.handleSubmit(onSubmit)}
            disabled={isDisabled}
          />
        </View>
      </View>
    </Container.Main>
  )
}

export default ConfirmWallet

const styles = StyleSheet.create({
  imgLogin: {
    width: horizontalScale(362),
    height: verticalScale(360),
    alignSelf: 'center',
    marginTop: verticalScale(14),
    marginLeft: horizontalScale(13)
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  viewInfo: {
    backgroundColor: Colors.hFFFFFF,
    paddingTop: verticalScale(24),
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    paddingHorizontal: horizontalScale(22),
    flex: 1,
    marginTop: verticalScale(24),
    justifyContent: 'space-between',
    paddingBottom: verticalScale(34)
  },
  title1: {
    fontSize: fontSize(20),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    lineHeight: fontSize(30),
    color: Colors.hF8D247,
    marginTop: verticalScale(26)
  },
  title2: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    textAlign: 'center',
    lineHeight: fontSize(22),
    color: Colors.hFFFFFF
  },
  marginTop: {
    marginTop: verticalScale(10)
  },
  paddingBottom: {
    paddingBottom: verticalScale(100)
  },
  textLabel: {
    color: Colors.h151515
  },
  wrapperFlatlist: {
    flex: 1,
    marginBottom: verticalScale(30),
  },
  bgInput: {
    width: '50%',
    alignItems: 'center'
  },
  inputStyle: {
    backgroundColor: Colors.BASE_COLOR.WHITE,
    borderColor: Colors.hE3E3E3,
    borderWidth: 1,
    width: horizontalScale(159),
    height: verticalScale(48),
    marginBottom: verticalScale(17),
  },
  labelInput: {
    paddingLeft: horizontalScale(18),
    fontFamily: Fonts.Helvetica_Bold,
    fontSize: fontSize(14),
    color: Colors.h656565,
    width: '100%'
  },
  btnDisabled: {
    backgroundColor: Colors.hE3E3E3
  },
  txtDisabled: {
    color: Colors.h656565,
    opacity: 0.7
  }
})