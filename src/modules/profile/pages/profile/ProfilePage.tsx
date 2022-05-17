import React, { useState } from 'react'
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { profileConst } from '@src/modules'
import { useNavigation } from '@react-navigation/native'
import { SvgProps } from 'react-native-svg'
import {
  Colors,
  Container,
  Fonts,
  fontSize,
  horizontalScale,
  verticalScale,
  IconEdit,
  IconBell,
  IconActiveBell,
  IconNext,
  IconRedNext,
  IMAGE,
  Screens,
  Modal,
  isTablet,
  Button
} from '@src/core'
import { LanguareComponent } from '../../components'

interface Item {
  title: string,
  Icon: React.FC<SvgProps>
}

const ProfilePage = () => {
  const { t } = useTranslation()
  const [dataInform] = useState<any>([])
  const navigation = useNavigation()
  const [showModalLanguage, setShowModalLanguage] = useState(false)
  const [showModalLogOut, setShowModalLogOut] = useState(false)
  const { settings, network, others, signout, userDatas, urlDefaultAvatar } = profileConst

  const handleNavigator = (screen: string, data?: any) => {
    data ? navigation.navigate(screen, data) : navigation.navigate(screen)
  }

  const onLogout = () => {
    setShowModalLogOut(false)
    handleNavigator(Screens.LOGIN)
  }

  const onHandleItem = (title: string) => {
    switch (title) {
      case "edit":
        handleNavigator(Screens.EDIT_PROFILE, userDatas)
        break
      case "inform":
        handleNavigator(Screens.NOTIFICATION_PROFILE)
        break
      case "kyc":
        handleNavigator(Screens.KYC_ACCOUNT)
        break
      case "recover_phrase":
        handleNavigator(Screens.RECOVERY_SEED_PHRASE)
        break
      case "security":
        handleNavigator(Screens.SECURITY_PAGE)
        break
      case "change_password":
        handleNavigator(Screens.CHANGE_PASSWORD)
        break
      case "about":
        break
      case "help_center":
        break
      case "service_terms":
        break
      case "privacy_policy":
        break
      case "languages":
        setShowModalLanguage(true)
        break
      case "sign_out":
        setShowModalLogOut(true)
        break
      default:
        break
    }
  }

  const renderInforCardView = () => (
    <ImageBackground
      style={[styles.bgProfile, isTablet && styles.bgTablet]}
      source={IMAGE.BG_PROFILE}
      imageStyle={styles.imProfile}
    >
      <Image source={{ uri: userDatas.avatar || urlDefaultAvatar }} style={[styles.center, styles.avatar]} />

      <Text style={[styles.txtTitle, styles.txtWhite, styles.center, styles.name]}>{userDatas.fullName}</Text>

      <Text style={[styles.txtInfo, styles.txtWhite, styles.center]}>{userDatas.email}</Text>
      <Text style={[styles.txtInfo, styles.txtWhite, styles.center]}>+{userDatas.country} {userDatas.numberPhone}</Text>
    </ImageBackground>
  )

  const renderBtnHeaderView = (Icon: React.FC<SvgProps>, title: string) => (
    <TouchableOpacity style={styles.headerIcon} onPress={() => onHandleItem(title)}>
      <Icon />
    </TouchableOpacity>
  )

  const renderItemView = (item: Item, out?: boolean, net?: boolean) => (
    <TouchableOpacity
      style={[styles.row, styles.wrapperItem, out && styles.marginBottom]}
      onPress={() => onHandleItem(item.title)}
      key={item.title}
    >
      <View style={styles.wrapperTitleView}>
        <item.Icon />
        <Text style={[styles.txtTitleItem, out && styles.txtOut]}>{t(item.title)}</Text>
        {net &&

          <View style={styles.networkNote}>
            <Text style={styles.txtNetwork}>{t('cardano')}</Text>
          </View>
        }
      </View>
      {out ? <IconRedNext /> : <IconNext />}

    </TouchableOpacity>
  )
  const renderLogOutView = ()=>(
    <View style={styles.wrapperLogOut}>
      <Text style={[styles.txtTitle,styles.txtlogout]}>{t('des_logout')}</Text>
      <Button.Main
          label={t('logout')}
          container={styles.buttonOut}
          onPress={() => onLogout()}
      />
       <Button.Main
          label={t('no')}
          container={styles.buttonNo}
          onPress={() => setShowModalLogOut(false)}
          labelStyle={ styles.txtButtonNo}
      />
    </View>
  )

  return (
    <Container.Profile>
      <View style={styles.content}>
        <View style={[styles.headerContent, styles.row]}>
          <Text style={styles.headerTitle}>{t('account')}</Text>

          <View style={styles.row}>
            {renderBtnHeaderView(IconEdit, 'edit')}
            {renderBtnHeaderView(dataInform.length ? IconActiveBell : IconBell, 'inform')}
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} >

          {renderInforCardView()}

          <Text style={[styles.txtTitle, styles.txtBlack]}>{t('settings')}</Text>
          {settings.map((item) => (renderItemView(item)))}

          <Text style={[styles.txtTitle, styles.txtBlack]}>{t('network')}</Text>
          {renderItemView(network, false, true)}

          <Text style={[styles.txtTitle, styles.txtBlack]}>{t('others')}</Text>
          {others.map((item) => (renderItemView(item)))}

          {renderItemView(signout, true)}
        </ScrollView>
      </View>
      <Modal.Light visible={showModalLanguage||showModalLogOut}>
        {
        showModalLanguage
        &&<LanguareComponent onClose={() => setShowModalLanguage(false)} />
        ||renderLogOutView() 
        }
      </Modal.Light>
    </Container.Profile>
  )
}

export default ProfilePage

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
    paddingHorizontal: horizontalScale(22),
  },
  row: {
    flexDirection: 'row',
  },
  headerContent: {
    height: verticalScale(56),
    marginTop: verticalScale(44),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: fontSize(20),
    lineHeight: fontSize(30),
    fontFamily: Fonts.Helvetica_Bold,
    color: Colors.h151515
  },
  headerIcon: {
    marginLeft: horizontalScale(20)
  },
  txtWhite: {
    color: Colors.hFFFFFF
  },
  txtBlack: {
    color: Colors.h151515,
    marginTop: verticalScale(30)
  },
  txtTitle: {
    fontSize: fontSize(20),
    lineHeight: fontSize(30),
    fontFamily: Fonts.Helvetica_Bold,
  },
  wrapperItem: {
    height: verticalScale(60),
    justifyContent: 'space-between',
    borderBottomColor: Colors.hE3E3E3,
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  txtTitleItem: {
    textAlign: 'left',
    paddingLeft: horizontalScale(12),
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    fontWeight: '400',
    fontFamily: Fonts.Helvetica
  },
  networkNote: {
    height: verticalScale(34),
    width: horizontalScale(82),
    backgroundColor: Colors.h96481B,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: horizontalScale(10)
  },
  txtNetwork: {
    fontSize: fontSize(12),
    fontWeight: '400',
    fontFamily: Fonts.Helvetica,
    lineHeight: fontSize(22),
    color: Colors.hFFFFFF
  },
  txtOut: {
    color: Colors.hE95534,
    fontWeight: 'bold'
  },
  bgProfile: {
    width: '100%',
    height: verticalScale(218),
    marginTop: verticalScale(8),
    paddingVertical: verticalScale(20)
  },
  marginBottom: {
    marginBottom: verticalScale(120)
  },
  center: {
    alignSelf: 'center'
  },
  txtInfo: {
    fontSize: fontSize(14),
    lineHeight: fontSize(22),
    fontWeight: '400',
    fontFamily: Fonts.Helvetica
  },
  avatar: {
    width: horizontalScale(88),
    height: horizontalScale(88),
    borderRadius: horizontalScale(44)
  },
  name: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(4)
  },
  wrapperTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  imProfile: {
    borderRadius: 16
  },
  bgTablet: {
    width: '100%',
    height: horizontalScale(218),
    marginTop: verticalScale(8),
    paddingVertical: horizontalScale(30)
  },
  wrapperLogOut:{
    width: horizontalScale(300),
    backgroundColor: Colors.BASE_COLOR.WHITE,
    borderRadius: 16,
    paddingVertical: verticalScale(24),
    paddingHorizontal: horizontalScale(10)
  },
  txtlogout:{
    textAlign:'center',
    color: Colors.h151515
  },
  buttonOut:{
    width: horizontalScale(200),
    alignSelf:'center',
    marginTop: verticalScale(24)
  },
  buttonNo:{
    width: horizontalScale(200),
    alignSelf:'center',
    backgroundColor: Colors.BASE_COLOR.WHITE,
    borderWidth: 1,
    borderColor: Colors.h151515,
    marginTop: verticalScale(18)
  },
  txtButtonNo:{
    color: Colors.h151515
  }
})