import { Button, Colors, Fonts, fontSize, Form, horizontalScale, TOAST_TYPE } from '@src/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Dimensions, Text, FlatList } from 'react-native'
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { actionPushToast } from '@src/app/reducers/app.reducer'
import { dataPhrase, listPhrase } from '../constants'

const { width } = Dimensions.get('window')
interface FormValues {
  name: string
}
interface IProps {
  onPress: () => void
}

const ConfirmPhrase1 = (props: IProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { onPress } = props
  const [listphrase, setPhrase] = useState(listPhrase)

  const form = useForm<FormValues>({
    defaultValues: {},
    mode: 'onChange',
  })

  const updateListPhrase = (id: number, type: boolean) => {
    const data = listphrase.map((obj, index) => {
      if (index === id) {
        return { ...obj, status: !!type }
      }
      return { ...obj }
    })
    setPhrase(data)
  }

  const onValidate = (id: number, e: any) => {
    const { nativeEvent } = e
    const { text } = nativeEvent
    if (text === dataPhrase[id]) {
      updateListPhrase(id, true)
    }
    else {
      updateListPhrase(id, false)
    }
  }

  const renderItemInput = ({ item, index }: any) => (
    <Form.TextInput
      name={`Word${item.name}`}
      label={`Word  ${item.name}`}
      containerStyle={styles.bgInput}
      labelStyle={styles.labelInput}
      contentStyle={styles.inputStyle}
      check={item.status}
      onChange={(e) => onValidate(index, e)}
      autoCapitalize="none"
    />
  )

  const onRegisteSuccess = () => {
    const res = listphrase.filter((obj) => obj.status === false)
    res.length > 0 ? dispatch(actionPushToast({ value: t('err_checkPhrase'), type: TOAST_TYPE.FAILURE })) : onPress()
  }

  const renderFooter = () => {
    return (
      <Button.Main
        onPress={onRegisteSuccess}
        label={t('next')}
      />
    )
  }

  return (
    <View style={styles.flex}>
      <Text style={styles.title}>{t('confirm_phrase')}</Text>
      <Text style={styles.title2}>{t('title_confirm')}</Text>
      <View style={styles.content}>
        <FormProvider {...form}>
          <FlatList
            contentContainerStyle={styles.viewPhrase}
            data={listphrase}
            numColumns={2}
            renderItem={renderItemInput}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
          />
        </FormProvider>
      </View>
    </View>
  )
}

export default ConfirmPhrase1

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width,
    paddingTop: horizontalScale(30),
    backgroundColor: Colors.hEFE4DD,
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30)
  },
  title: {
    fontSize: fontSize(20),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    color: Colors.h96481B
  },
  title2: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    lineHeight: fontSize(22),
    textAlign: 'center',
    marginTop: horizontalScale(10),
    color: Colors.h656565
  },
  content: {
    flex: 1,
    backgroundColor: Colors.hFFFFFF,
    marginTop: horizontalScale(24),
    paddingHorizontal: horizontalScale(22),
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30)
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
    height: horizontalScale(48),
    marginBottom: horizontalScale(17),
  },
  labelInput: {
    paddingLeft: horizontalScale(18),
    fontFamily: Fonts.Helvetica_Bold,
    fontSize: fontSize(14),
    color: Colors.h656565,
    width: '100%'
  },
  viewPhrase: {
    paddingTop: horizontalScale(24),
    paddingBottom: horizontalScale(34)
  }

})
