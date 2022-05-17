import React, { useState } from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from "react-hook-form"
import ImagePicker from 'react-native-image-crop-picker'
import {
  Button,
  Colors,
  Container,
  Fonts,
  fontSize,
  horizontalScale,
  Form,
  verticalScale,
  IconCamera,
  IconRowDown,
  Modal,
} from '@src/core'
import { profileConst } from '@src/modules'
import CountryPicker from 'react-native-country-picker-modal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface FormValues {
  fullName: string,
  email: string,
  numberPhone: string
}

const EditProfile = ({ route }: any) => {
  const { t } = useTranslation()
  const {urlDefaultAvatar}= profileConst
  const { params } = route
  const [isShowOption, setIsShowOption] = useState(false)
  const [avatar, setAvatar] = useState<string>(params.avatar||urlDefaultAvatar)
  
  const [showModalContry,setSHowModalContry]= useState(false)
  const [countryCode, setCountryCode] = useState<any>(params.countryCode)
  const [country, setCountry] = useState<any>(params.country)
  const [withFilter] = useState<boolean>(true)
  const [withAlphaFilter] = useState<boolean>(false)

  const form = useForm<FormValues>({
    defaultValues: params,
    mode: 'onChange',
  })

  const onsetAvatar = (path:string)=>{
    setAvatar(path)
    handleShowOption(false)
  }

  const handleOpenLibrary = async () => {
    const data: any = await ImagePicker.openPicker({
      width: 300,
      height:300,
      cropping:true,
      mediaType: 'photo',
    })
    onsetAvatar(data.path)
  }

  const handleOpenCamera = async () => {
    const data: any = await ImagePicker.openCamera({
      width: 300,
      height:300,
      cropping:true,
      mediaType: 'photo',
    })
    onsetAvatar(data.path)
  }

  const onSelect = (country: any) => {
    setCountryCode(country.cca2)
    setCountry(country.callingCode[0])
    setSHowModalContry(false)
  }

  const handleShowOption = (value: boolean) => {
    setIsShowOption(value)
  }

  const renderAvatarView = () => (
    <TouchableOpacity onPress={() => handleShowOption(true)} style={styles.wrapperAvatar}>
      <Image source={{ uri: avatar|| urlDefaultAvatar}} style={styles.imgAvatar} />
      <IconCamera style={styles.iconCamera} />
    </TouchableOpacity>
  )
  const renderInputPhoneView = () => (
    <View style={styles.row}>
      <TouchableOpacity style={styles.wrapperHeadPhone} onPress={()=>setSHowModalContry(true)} >
        <CountryPicker
          {...{ countryCode, withFilter, withAlphaFilter, onSelect, }}
          visible={showModalContry}
          containerButtonStyle={styles.flag}
          onClose={()=>setSHowModalContry(false)}
        />
        <Text style={styles.fontContry}>{`+${country}`}</Text>
        <IconRowDown />
      </TouchableOpacity>

      <Form.TextInput
        name='numberPhone'
        contentStyle={styles.inputPhoneStyle}
        style={styles.txtInput}
        keyboardType="phone-pad"
      />
    </View>
  )
  const renderInputView = (name: string, label: string) => (
    <Form.TextInput
      name={name}
      label={t(label)}
      labelStyle={[styles.title, styles.font]}
      containerStyle={styles.containerStyle}
      contentStyle={styles.inputStyle}
      style={styles.txtInput}
    />

  )
  const renderOptionButton = (label: string, style: StyleProp<ViewStyle>, funtion: ()=> void) => (
    <TouchableOpacity
      style={[styles.optionItem, style]}
      onPress={funtion}
    >
      <Text style={styles.fontOption}>{t(label)}</Text>
    </TouchableOpacity>
  )
  const renderOptionsView = () => (
    <View style={styles.option}>
      <View style={styles.wrapperOption}>
        <View style={[styles.optionItem, styles.boderTop]}>
          <Text style={[styles.fontOption, styles.titleOption]}>{t('select_an_avatar')}</Text>
        </View>
        {renderOptionButton('select_an_avatar',styles.border,()=>handleOpenCamera())}
        {renderOptionButton('choose_from_your_library',styles.boderBottom,()=>handleOpenLibrary())}
        {renderOptionButton('cancel',{...styles.marginTop,...styles.borderRadius},()=>handleShowOption(false))}
      </View>
    </View>
  )

  return (
    <Container.Main
      headerShow
      title={t('edit_profile')}
    >
      <View style={styles.content}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={[styles.desEdit, styles.font]}>{t('des_edit_profile')}</Text>
            {renderAvatarView()}
            <Text style={[styles.font, styles.titleAdd]}>{t('add_profile_picture')}</Text>

            <FormProvider {...form}>
              {renderInputView('fullName', 'full_name')}
              {renderInputView('email', 'email')}

              <Text style={[styles.title, styles.font]}>{t('phone_number')}</Text>
              {renderInputPhoneView()}
            </FormProvider>

          </View>
        </KeyboardAwareScrollView>

        <Button.Main
          label={t('save_changes')}
          container={styles.marginTop}
          onPress={() => { }}
        />
      </View>
      <Modal.Dark visible={isShowOption}>
        {renderOptionsView()}
      </Modal.Dark>
    </Container.Main>
  )
}

export default EditProfile

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
    flex: 1,
    justifyContent: 'space-between'
  },
  fontContry: {
    fontSize: fontSize(14),
    lineHeight: fontSize(22),
    color: Colors.h151515
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
    height: verticalScale(48)
  },
  containerStyle:{
    marginBottom: verticalScale(17),
  },
  inputPhoneStyle: {
    height: verticalScale(48),
    width: horizontalScale(218),
    backgroundColor: Colors.BASE_COLOR.WHITE,
  },
  imgAvatar: {
    width: horizontalScale(100),
    height: horizontalScale(100),
    borderRadius: horizontalScale(50),
    alignSelf: 'center',

  },
  txtInput: {
    color: Colors.h151515
  },
  iconCamera: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  wrapperAvatar: {
    width: horizontalScale(100),
    height: horizontalScale(100),
    marginTop: verticalScale(24),
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.BASE_COLOR.WHITE,
    borderColor: Colors.hE3E3E3,
    borderWidth: 1,
    borderRadius: horizontalScale(24),
    marginTop: verticalScale(3)
  },
  wrapperHeadPhone: {
    flex: 1,
    height: verticalScale(48),
    borderColor: Colors.hE3E3E3,
    borderRightWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(14)
  },
  option: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  wrapperOption: {
    width: '100%',
    height: verticalScale(250),
    alignSelf: 'flex-end',
    paddingBottom: verticalScale(30),
    paddingHorizontal: horizontalScale(10),
  },
  optionItem: {
    backgroundColor: Colors.BASE_COLOR.WHITE,
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center'
  },
  boderBottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  boderTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  borderRadius: {
    borderRadius: 10
  },
  border: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.hE3E3E3,
  },
  fontOption: {
    color: Colors.h151515,
    fontFamily: Fonts.Helvetica,
    fontSize: fontSize(16)
  },
  titleOption: {
    fontFamily: Fonts.Helvetica_Bold,
    fontSize: fontSize(18)
  },
  flag:{
    width:32
  }
})
