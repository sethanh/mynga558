import React, { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  Colors, Container, Fonts, fontSize, horizontalScale, verticalScale, Button, Form, Screens
} from '@src/core'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

interface FormValues {
  amount: number,
}

const SendPage = ({ route }: any) => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { params } = route
  const [data] = useState(params)
  const form = useForm<FormValues>({
    defaultValues: params,
    mode: 'onChange',
  })

  const onNext =  () => {
    const datas = form.getValues()
    if(datas.amount){
      navigation.navigate( Screens.ADDRESS_SEND,datas)
    }
  }

  const renderCoinItem = (item: any) => (
    <View style={styles.itemCoin}>
      <Image
        style={styles.imgCoin}
        source={{ uri: item.img || '' }}
      />
      <View style={styles.colums}>
        <Text style={styles.textName}>{item?.name}</Text>
        <Text style={styles.textLabel}>{item?.value}</Text>
      </View>
      <View style={styles.colums}>
        <Text style={[styles.textLabel, styles.txtRight]}>{t('available_balance')}</Text>
        <Text style={[styles.textName, styles.txtRight]}>{item?.coin}</Text>
      </View>
    </View>
  )

  return (
    <Container.Main
      headerShow
      title={t('send_crypto')}
    >
      <View style={styles.content}>
        {renderCoinItem(data)}
        <Text style={[styles.textName, styles.txtType]}>{t('type_amount')}</Text>
        <View style={styles.wrapperInput}>
          <FormProvider {...form}>
            <Form.TextInput
              name='amount'
              contentStyle={styles.inputStyle}
              style={styles.txtInput}
              keyboardType='numeric'
            />
          </FormProvider>
          <Text style={[styles.txtValue]}>{data?.value}</Text>
        </View>
        <Button.Main
          label={t('next')}
          container={styles.button}
          onPress={() => onNext()}
        />

      </View>
    </Container.Main>
  )
}

export default SendPage

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
  },
  imgCoin: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: horizontalScale(25)
  },
  rows: {
    flexDirection: 'row',
  },
  colums: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: horizontalScale(12)
  },
  itemCoin: {
    flexDirection: 'row',
    backgroundColor: Colors.hE3E3E3,
    padding: horizontalScale(12),
    borderRadius: 12,
    alignItems: 'center'
  },
  textName: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica_Bold,
    lineHeight: fontSize(24),
    color: Colors.h151515,
  },
  textLabel: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    lineHeight: fontSize(22),
    color: Colors.h656565
  },
  flex1: {
    flex: 1
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  black: {
    color: Colors.h151515
  },
  txtRight: {
    textAlign: 'right'
  },
  txtType: {
    textAlign: 'center',
    marginTop: verticalScale(30)
  },
  button: {
    marginTop: verticalScale(70)
  },
  inputStyle: {
    backgroundColor: Colors.BASE_COLOR.WHITE,
    borderBottomWidth: 1,
    width: horizontalScale(200),
    borderColor: Colors.hE3E3E3,
    height: verticalScale(60)
  },
  txtInput: {
    fontSize: fontSize(50),
    fontFamily: Fonts.Helvetica,
    lineHeight: fontSize(57.5),
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.h151515,
  },
  wrapperInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(56)
  },
  txtValue: {
    position: 'absolute',
    right: horizontalScale(41),
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica,
    lineHeight: fontSize(24),
    color: Colors.h151515,
    fontWeight: '400',
  }
})