import { Colors, Container, Fonts, fontSize, horizontalScale, isIOS, UILabel, verticalScale } from '@src/core'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Animated, ScrollView } from 'react-native'
import { dataBtnWallet } from '../../constants'
import { CoinPage } from '../coin'
import { NFTPage } from '../nft'

const { width } = Dimensions.get('window')
const widthBtn = (width - horizontalScale(105)) / 3

const WalletPage = () => {
  const { t } = useTranslation()
  const [statusSwitch, setStatus] = useState(false)
  const refSlide = useRef<ScrollView>(null)
  const fadeAnim = useRef(new Animated.Value(0)).current

  const toggleSwitch = () => setStatus(previousState => !previousState)

  const translateX = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (width / 2) - horizontalScale(20)],
  })

  const colorTab1 = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.h96481B, Colors.h151515],
  })

  const colorTab2 = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.h151515, Colors.h96481B],
  })

  const onChangeTab = (index: number) => () => {
    Animated.timing(fadeAnim, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start()
    refSlide.current?.scrollTo({ x: index ? width : -width, y: 0 })
  }


  return (
    <Container.Wallet
      showHeaderWallet
      name="Stanley Cohen"
      statusSwitch={statusSwitch}
      onSwitch={toggleSwitch}
    >
      <View style={styles.content}>
        <UILabel.Gradient style={styles.title}>$15,567.67</UILabel.Gradient>
        {
          statusSwitch && (
            <View style={styles.viewBtn}>
              {
                dataBtnWallet.map((item, index) => {
                  return (
                    <View key={index} style={styles.styleBtn}>
                      <Text style={styles.textBtn}>{t(`${item.title}`)}</Text>
                    </View>
                  )
                })
              }
            </View>
          )
        }

        <View style={styles.flex1}>
          <View style={styles.viewTab}>
            <TouchableOpacity
              onPress={onChangeTab(0)}
              style={styles.tab}
            >
              <Animated.Text style={[styles.textTab, { color: colorTab1 }]}>{t('coin')}</Animated.Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onChangeTab(1)}
              style={styles.tab}
            >
              <Animated.Text style={[styles.textTab, { color: colorTab2 }]}>{t('nft')}</Animated.Text>
            </TouchableOpacity>
            <Animated.View
              style={[
                styles.tabUnderlineStyle,
                {
                  transform: [
                    { translateX },
                  ]
                },
              ]}
            />
          </View>
          <ScrollView
            ref={refSlide}
            pagingEnabled
            horizontal
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={1}
            scrollEnabled={false}
          >
            <CoinPage statusSwitch={statusSwitch} />
            <NFTPage />
          </ScrollView>
        </View>

      </View>
    </Container.Wallet>
  )
}

export default WalletPage

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.hF5F5F5,
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    marginTop: horizontalScale(15),
    paddingTop: isIOS ? horizontalScale(15) : 0
  },
  title: {
    fontSize: fontSize(46),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center'
  },
  styleBtn: {
    width: widthBtn,
    height: horizontalScale(38),
    backgroundColor: Colors.h151515,
    borderRadius: horizontalScale(19),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: horizontalScale(10)
  },
  viewBtn: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(42.5),
    marginBottom: horizontalScale(15),
    marginTop: isIOS ? horizontalScale(15) : 0
  },
  textBtn: {
    fontSize: fontSize(14),
    color: Colors.hFFFFFF,
    fontFamily: Fonts.Helvetica
  },
  flex1: {
    flex: 1,
  },
  tabUnderlineStyle: {
    position: 'absolute',
    width: (width / 2) - horizontalScale(20),
    height: 1,
    backgroundColor: Colors.h96481B,
    bottom: 0,
  },
  viewTab: {
    flexDirection: 'row',
    height: verticalScale(40),
    marginHorizontal: horizontalScale(20)
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.hE3E3E3
  },
  textTab: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica_Bold,
    color: Colors.h96481B
  }
})
