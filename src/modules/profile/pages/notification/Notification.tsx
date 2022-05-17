import React, {useState} from 'react'
import { StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native'
import { useTranslation } from 'react-i18next'
import {Colors,Container,Fonts,fontSize,horizontalScale,verticalScale,
  IconTrash,IconReceiveNoti,IconSentNoti,IconFailNoti,IconRowNoti,
  IconCalendar,Screens,heightSatusbar
} from '@src/core'
import { profileConst } from '@src/modules'
import { useNavigation } from '@react-navigation/native'

const Notification = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const {notiDatas}= profileConst
  const [data]= useState(notiDatas)
  const onHandleTrash=()=>{
  }

  const onHandleDetailItem=(data:any)=>{
    navigation.navigate(Screens.NOTIFICATION_DETAIL,data)
  }

  const renderNotiItem=({item}:any)=>(
    <View style={styles.wrapperNotiItem}>
        {!item.status?<IconReceiveNoti/>:item.status===1?<IconSentNoti/>:<IconFailNoti/>}
        <TouchableOpacity style={styles.wrapperContent} onPress={()=>onHandleDetailItem(item)}>
          <Text style={[styles.font,styles.title]}>{item.title}</Text>
          <Text style={[styles.font]} numberOfLines={1} ellipsizeMode='tail'>{item.token}</Text>

          <View style={styles.wrapperTxt}>
            <Text style={[styles.txtTime,styles.desFont]}>{item.time}</Text>
            <Text style={[
              styles.desFont,
              !item.status?styles.txtReceive:item.status===1?styles.txtSent:styles.txtFail
              ]}
            >
              {`${!item.status?'+':'-'} ${item.total} ${item.unit}`}
            </Text>
          </View>
        </TouchableOpacity>
    </View>
  )
  const renderTimeButton=()=>(
    <TouchableOpacity style={styles.btnSelectTime}>
      <IconCalendar/>
      <Text style={styles.txtBtnTime}>30 day ago</Text>
      <IconRowNoti/>
    </TouchableOpacity>
  )

  return (
    <Container.Main
      headerShow
      title={t('notification')}
      IconRight={IconTrash}
      styleRight={styles.btnRight}
      onPressRight={onHandleTrash}
    >
      <View style={styles.content}>
      {renderTimeButton()}
      <FlatList
        data={data}
        renderItem={renderNotiItem}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </Container.Main>
  )
}

export default Notification

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
  },
  title: {
    fontFamily: Fonts.Helvetica_Bold,
  },
  btnRight: {
    position: 'absolute',
    top: heightSatusbar + horizontalScale(15),
    right: horizontalScale(18),
  },
  wrapperNotiItem:{
    width:'100%',
    paddingVertical: verticalScale(14),
    height: verticalScale(104),
    borderBottomColor: Colors.hE3E3E3,
    borderBottomWidth: 1,
    flexDirection:'row',
  },
  wrapperTxt:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: verticalScale(6)
  },
  wrapperContent:{
    flex:1,
    paddingLeft: horizontalScale(12),
  },
  txtTime:{
    color: Colors.h656565
  },
  txtReceive:{
    color: Colors.h1E65FF
  },
  txtSent:{
    color: Colors.h96481B
  },
  txtFail:{
    display:'none'
  },
  btnSelectTime:{
    width: horizontalScale(200),
    height: verticalScale(38),
    backgroundColor: Colors.hEFE4DD,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: horizontalScale(16),
    alignItems:'center',
    borderRadius: 20,
    marginBottom: verticalScale(6)
  },
  txtBtnTime:{
    flex:1,
    paddingLeft: horizontalScale(10),
    fontSize: fontSize(14),
    lineHeight: fontSize(22),
    fontFamily: Fonts.Helvetica,
    fontWeight:'400',
    color: Colors.h151515
  }
})
