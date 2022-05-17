import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import {Colors,Container,Fonts,fontSize,horizontalScale,verticalScale,IconTrash,Button,heightSatusbar} from '@src/core'

const NotificationDetail = ({ route }: any) => {
  const { t } = useTranslation()
  const { params } = route
  const [data] = useState(params)

  const onHandleTrash = () => {
  }

  const renderCardRow = (name: string, total: number, strong?: boolean) => (
    <View style={styles.rowCard}>
      <Text style={[styles.fontCard, styles.nameCard, strong && styles.strongCard]}>{t(name)}</Text>
      <Text style={[styles.fontCard, styles.totalCard, strong && styles.strongCard]}>{total} BTC</Text>
    </View>
  )
  const renderInfoBaseView = () => (
    <View style={[styles.wrapperInfoBase]}>
      <View style={[styles.wrapperStatus]}>
        <Text style={styles.txtTitle}>{t('status')}</Text>
        <Text style={[
          styles.fontCard, styles.totalCard,
          data.status === 2 && styles.txtFail || styles.txtSucces
        ]}>{t(data.status === 2 && 'failed' || 'successful')}
        </Text>
      </View>
      <View>
        <Text style={styles.txtTitle}>{t('date')}</Text>
        <Text style={[styles.fontCard, styles.totalCard]}>{data.time}</Text>
      </View>
    </View>
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
        <View>
          <Text style={[styles.title2, styles.marginBottom]}>
            {t(!data.status && 'received_btc' || 'sent_btc')}
          </Text>
          {renderInfoBaseView()}

          <Text style={styles.txtTitle}>{t('from')}</Text>
          <Text style={[styles.fontCard, styles.totalCard, styles.marginBottom]}
            numberOfLines={1} ellipsizeMode='middle'>{data.from}
          </Text>

          <Text style={styles.txtTitle}>{t('to')}</Text>
          <Text style={[styles.fontCard, styles.totalCard, styles.marginBottom]}
            numberOfLines={1} ellipsizeMode='middle'>{data.to}
          </Text>

          <Text style={styles.txtTitle}>{t('network')}</Text>
          <Text style={[styles.fontCard, styles.totalCard, styles.marginBottom]}
            numberOfLines={1} ellipsizeMode='middle'>{data.network}
          </Text>

          <View style={styles.bgTotalCard}>
            {renderCardRow('amount', data.total)}
            {renderCardRow('network_fee', 0.9)}
            <View style={styles.line} />
            {renderCardRow('total_amount', data.total + 0.9, true)}
            <Text style={styles.txtTotal}>$ 486.250</Text>
          </View>
        </View>
        {data.status === 2 || <Button.Main
          label={t('share')}
          container={{}}
          onPress={() => { }}
        />}

      </View>
    </Container.Main>
  )
}

export default NotificationDetail

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
    justifyContent: 'space-between'
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
    right: horizontalScale(18)
  },
  title2: {
    fontSize: fontSize(32),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    lineHeight: fontSize(42),
    color: Colors.hC2862F
  },
  bgTotalCard: {
    height: verticalScale(174),
    backgroundColor: Colors.hEFE4DD,
    borderRadius: 16,
    padding: horizontalScale(16),
  },
  rowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fontCard: {
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    marginBottom: verticalScale(10)
  },
  nameCard: {
    color: Colors.h656565,
    fontFamily: Fonts.Helvetica,
  },
  totalCard: {
    color: Colors.h151515,
    fontFamily: Fonts.Helvetica_Bold
  },
  strongCard: {
    fontSize: fontSize(20),
    lineHeight: fontSize(30),
    color: Colors.h151515
  },
  line: {
    height: 1,
    backgroundColor: '#E6D4CA',
    marginBottom: verticalScale(10)
  },
  txtTotal: {
    textAlign: 'right'
  },
  marginBottom: {
    marginBottom: 18
  },
  wrapperInfoBase: {
    flexDirection: 'row',
    marginBottom: verticalScale(8)
  },
  wrapperStatus: {
    width: horizontalScale(137)
  },
  txtTitle: {
    fontFamily: Fonts.Helvetica,
    fontSize: fontSize(14),
    lineHeight: fontSize(22),
    color: Colors.h656565,
    fontWeight: '400',
    marginBottom: verticalScale(2)
  },
  txtFail: {
    color: Colors.hE95534
  },
  txtSucces: {
    color: Colors.h1E65FF
  }
})
