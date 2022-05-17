import { Colors, Container, Fonts, fontSize, horizontalScale, IconCloseLang, IconShare, Modal } from '@src/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview'
import { btnShare, info } from '../../constants'

const ChartPage = () => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  const modalInfomation = () => {
    return (
      <Modal.Dark
        visible={visible}
      >
        <View style={styles.modal}>
          <View style={styles.viewModal}>
            <View style={styles.viewHeader}>
              <Text style={styles.txthead}>{t('information')}</Text>
              <TouchableOpacity
                onPress={() => setVisible(false)}
              >
                <IconCloseLang />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.viewInfo}>
              <Text style={styles.infomation}>{info}</Text>
            </ScrollView>
            <View style={styles.viewShare}>
              {
                btnShare.map((item) => {
                  return (
                    <TouchableOpacity style={styles.row}>
                      <IconShare />
                      <Text style={[styles.infomation, styles.black]}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </View>
      </Modal.Dark>
    )
  }

  return (
    <Container.View
      headerShow
      showRight
      title='ADA'
      onRightClick={() => setVisible(true)}
    >
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://vn.tradingview.com/symbols/ADAUSD/' }}
          style={{ flex: 1 }}
        />
      </View>
      {modalInfomation()}
    </Container.View>
  )
}

export default ChartPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: horizontalScale(15)
  },
  modal: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  viewModal: {
    height: '79%',
    backgroundColor: Colors.hFFFFFF,
    borderTopLeftRadius: horizontalScale(16),
    borderTopRightRadius: horizontalScale(16)
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(22),
    paddingVertical: horizontalScale(10)
  },
  txthead: {
    fontSize: fontSize(20),
    lineHeight: fontSize(30),
    fontFamily: Fonts.Helvetica_Bold,
    color: Colors.h151515
  },
  infomation: {
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    fontFamily: Fonts.Helvetica,
    color: Colors.h656565
  },
  viewInfo: {
    flexGrow: 1,
    paddingHorizontal: horizontalScale(22),
    paddingBottom: horizontalScale(20)
  },
  black: {
    color: Colors.h151515,
    marginLeft: horizontalScale(10)
  },
  viewShare: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(22),
    paddingTop: horizontalScale(10),
    paddingBottom: horizontalScale(34),
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
