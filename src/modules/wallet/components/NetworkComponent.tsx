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

const NetworkComponent = (props: LangProps) => {
  const { onClose, data, onChoose } = props
  const { t } = useTranslation()

  const onChooseNetwork = (item: any) => () => {
    onChoose(item)
  }

  const renderButtonView = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.btnLang,
        item.isSelected && styles.btnLangFocus
      ]}
      onPress={onChooseNetwork(item)}
    >
      <Text
        style={[
          styles.txtLang,
          item.isSelected && styles.txtLangFocus
        ]}
      >{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.option}>
      <View style={[styles.wrapperOption, styles.borderTop]}>
        <View style={[styles.headChange, styles.spaceCenter, styles.borderTop]}>
          <Text style={styles.txthead}>{t('choose_network')}</Text>
          <TouchableOpacity onPress={onClose}>
            <IconCloseLang />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            contentContainerStyle={styles.viewFooter}
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

export default NetworkComponent

NetworkComponent.defaultProps = {
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
    height: verticalScale(50),
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
    height: verticalScale(220),
    alignSelf: 'flex-end',
    paddingBottom: verticalScale(52),
    backgroundColor: Colors.BASE_COLOR.WHITE,
    paddingHorizontal: horizontalScale(22)

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
    backgroundColor: 'white',
    marginBottom: verticalScale(18),
    marginHorizontal: -horizontalScale(22),
    paddingHorizontal: horizontalScale(22),
  },
  txthead: {
    fontSize: fontSize(20),
    lineHeight: fontSize(30),
    fontFamily: Fonts.Helvetica_Bold,
    color: Colors.h151515
  },
  viewFooter: {
    paddingBottom: horizontalScale(50)
  }
})
