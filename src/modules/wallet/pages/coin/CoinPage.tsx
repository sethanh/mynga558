import { useNavigation } from '@react-navigation/native'
import { Colors, Fonts, fontSize, horizontalScale, isTablet, List, Screens, Modal, IMAGE } from '@src/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { alphabet, dataCoin, tokenActions } from '../../constants'
import { TokenActionComponent } from '../../components'


const { width, height } = Dimensions.get('window')

interface CoinProps {
  statusSwitch: boolean
}

const CoinPage = ({ statusSwitch }: CoinProps) => {
  const [data,] = useState(dataCoin)
  const [itemCurrent, setCurrent] = useState(data[0])
  const [showModalTokenAction, setShowModalToken] = useState(false)
  const [coinSelected, setCoinSelected] = useState<any>(null)
  const navigation = useNavigation()
  const { t } = useTranslation()
  const keyExtractor = (item: any) => item.id
  const radius = isTablet ? width * 0.367 : width * 0.5

  const onHandleCoin = (item: any) => {
    setCoinSelected(item)
    setShowModalToken(true)
  }

  const onHandleTokenAction = (data: any) => {
    setShowModalToken(false)
    switch (data.title) {
      case 'send':
        navigation.navigate(Screens.SEND_TOKEN_PAGE, coinSelected)
        break
      case 'recieve':
        break
      default:
        navigation.navigate(Screens.CHART_PAGE)
        break
    }
  }

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => onHandleCoin(item)}
        style={styles.item}>
        <Image
          style={styles.imgCoin}
          source={{ uri: item?.img }}
        />
      </TouchableOpacity>
    )
  }

  const renderVerticalList = ({ item }: any) => {
    return (
      <View style={styles.itemCoin}>
        <Image
          style={styles.imgCoin}
          source={{ uri: item.img || '' }}
        />

        <View style={styles.colums}>
          <View style={styles.rows}>
            <View style={styles.flex1}>
              <Text style={styles.textName}>{item?.name}</Text>
            </View>
            <View style={[styles.flex1, styles.spaceBetween]}>
              <Text style={[styles.textLabel, styles.black]}>2.3</Text>
              <Text style={styles.textName}>{item?.coin}</Text>
            </View>

          </View>
          <Text style={styles.textLabel}>{item?.value}</Text>
        </View>
      </View>
    )
  }

  const goToSearch = () => {
    navigation.navigate(Screens.SEARCH_PAGE)
  }

  const renderFooter = () => {
    return (
      <TouchableOpacity
        onPress={goToSearch}>
        <Text style={[styles.textMore, styles.centerText]}>{t('view_all')}</Text>
      </TouchableOpacity>
    )
  }

  const renderCard = () => {
    return (
      <TouchableOpacity
        onPress={() => onHandleCoin(itemCurrent)}
        style={{ width: isTablet ? radius + width * 0.072 : radius }}>
        <LinearGradient
          colors={Colors.gradientDefault}
          style={styleCircle(isTablet ? radius + width * 0.072 : radius - width * 0.025).viewCard}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.textCoin}>{itemCurrent.value}</Text>
          <View style={styles.contentCard}>
            <Text style={styles.textValue}>{itemCurrent.coin}</Text>
            <Text style={styles.textValue}>2.3</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  const renderText = () => {
    return (
      <View style={styles.viewAlpha}>
        {
          alphabet.map((item: any, index: number) => {
            return (
              <View style={styles.viewRow} key={index}>
                {
                  itemCurrent.value.charAt(0) === item && (
                    <ImageBackground
                      style={styles.letter}
                      source={IMAGE.IC_LETTER}
                    >
                      <Text style={styles.textLetter}>{item}</Text>
                    </ImageBackground>
                  )
                }
                <Text style={styles.textAlpha}>{item}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  const onGetItem = (item: any) => {
    setCurrent(item)
  }

  return (
    <View style={styles.container}>
      {
        !statusSwitch ? (
          <View style={{ height: height * 0.7 }}>
            <List.Circle
              height={height * 0.67}
              data={data}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              radius={radius}
              renderCard={renderCard}
              onCurrentItem={onGetItem}
              renderText={renderText}
            />

            <TouchableOpacity
              onPress={goToSearch}
              style={styles.position}>
              <Text style={styles.textMore}>{t('view_all')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: horizontalScale(100) }}
            data={data}
            renderItem={renderVerticalList}
            keyExtractor={(_item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
          />
        )
      }
      <Modal.Light visible={showModalTokenAction}>
        <TokenActionComponent
          data={tokenActions}
          onChoose={(data: any) => { onHandleTokenAction(data) }}
          onClose={() => setShowModalToken(false)}
        />
      </Modal.Light>
    </View>
  )
}

export default CoinPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width
  },
  item: {
    width: horizontalScale(60),
    height: horizontalScale(60),
    borderRadius: horizontalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.hFFFFFF
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
    marginHorizontal: horizontalScale(22),
    borderBottomWidth: 1,
    borderColor: Colors.hE3E3E3,
    paddingVertical: horizontalScale(15)
  },
  textName: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica_Bold,
    lineHeight: fontSize(24),
    color: Colors.h151515,
    maxWidth: horizontalScale(100)
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
  textMore: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica_Bold,
    color: Colors.h96481B,
  },
  position: {
    position: 'absolute',
    bottom: isTablet ? height * 0.15 : height * 0.12,
    left: horizontalScale(158)
  },
  centerText: {
    textAlign: 'center',
    marginVertical: horizontalScale(18),
  },
  textCoin: {
    fontSize: fontSize(20),
    color: Colors.hF8D247,
    fontFamily: Fonts.Helvetica_Bold,
    marginLeft: horizontalScale(10),
    marginTop: horizontalScale(15)
  },
  textValue: {
    fontSize: fontSize(16),
    color: Colors.hFFFFFF,
    fontFamily: Fonts.Helvetica_Bold,
  },
  contentCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
    marginTop: horizontalScale(10)
  },
  textAlpha: {
    fontSize: fontSize(12)
  },
  viewAlpha: {
    position: 'absolute',
    right: width * 0.0613,
    paddingTop: width * 0.07
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  letter: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    position: 'absolute',
    right: horizontalScale(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  textLetter: {
    fontSize: fontSize(28),
    color: Colors.hFFFFFF,
    fontFamily: Fonts.Helvetica
  }
})

const styleCircle = (radius: number) =>
  StyleSheet.create({
    viewCard: {
      width: radius - (width * 0.1),
      height: radius * 0.5,
      marginLeft: horizontalScale(10),
      borderRadius: width * 0.0533
    }
  })