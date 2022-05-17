import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  fontSize, horizontalScale,
  verticalScale, Colors, Fonts, IconCloseLang
} from '@src/core'

interface LangProps {
  onClose?: () => void | null
  data: Array<any>
  onChoose: (data: any) => void
}

const TokenActionComponent = (props: LangProps) => {
  const { onClose, data, onChoose } = props
  const { t } = useTranslation()

  const onChooseTokenAction = (item: any) => () => {
    onChoose(item)
  }

  const renderButtonView = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.btnLang]}
      onPress={onChooseTokenAction(item)}
    >
      <View style={styles.wrapperIcon}>
        <item.Icon/>
      </View>
      <View style={ styles.wrapperText}>
        <Text style={[styles.txthead]}>{t(item.title)}</Text>
        <Text style={[styles.txtdes]}>{t(item.des)}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.option}>
      <View style={[styles.wrapperOption, styles.borderTop]}>
        <View style={[styles.headChange, styles.spaceCenter]}>
          <Text style={styles.txthead}>{t('action_to_token')}</Text>
          <TouchableOpacity onPress={onClose}>
            <IconCloseLang />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={data}
            renderItem={renderButtonView}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </View>
    </View>
  )
}

export default TokenActionComponent

TokenActionComponent.defaultProps = {
  onClose: () => { }
}

const styles = StyleSheet.create({
  btnLangFocus: {
    backgroundColor: Colors.h96481B,
  },
  btnLang: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(25),
    backgroundColor: 'transparent',
    marginBottom: verticalScale(20),
    paddingHorizontal: horizontalScale(22)
    
  },
  txtLang: {
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    fontFamily: Fonts.Helvetica,
    fontWeight: '400',
    marginHorizontal: horizontalScale(11),
    color: Colors.h151515
  },
  txtLangFocus: {
    color: Colors.hFFFFFF
  },
  txt: {
    fontSize: fontSize(16),
    marginLeft: horizontalScale(17),
  },
  option: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  borderTop: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  wrapperOption: {
    width: '100%',
    alignSelf: 'flex-end',
    backgroundColor: Colors.BASE_COLOR.WHITE,
    paddingBottom: horizontalScale(30)
  },
  boderTop: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  spaceCenter: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headChange: {
    flexDirection: 'row',
    height: verticalScale(50),
    shadowColor: Colors.h1E1E1E,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    backgroundColor: Colors.BASE_COLOR.WHITE,
    marginBottom: verticalScale(18),
    paddingHorizontal: horizontalScale(22),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  txthead: {
    fontSize: fontSize(20),
    lineHeight: fontSize(30),
    fontFamily: Fonts.Helvetica_Bold,
    color: Colors.h151515
  },
  wrapperText:{
    flex: 1,
    marginLeft: horizontalScale(14)
  },
  wrapperIcon:{
    width: horizontalScale(54),
    height: horizontalScale(54),
    borderRadius: 12,
    backgroundColor: Colors.h96481B,
    alignItems:'center',
    justifyContent: 'center'
  },
  txtdes: {
    fontSize: fontSize(14),
    lineHeight: fontSize(24),
    fontFamily: Fonts.Helvetica,
    color: Colors.h151515
  }
})
