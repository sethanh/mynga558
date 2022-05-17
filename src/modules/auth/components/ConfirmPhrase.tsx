import { Colors, Fonts, fontSize, horizontalScale, IconHat, UILabel, IconStar, IMAGE, IconEyeHide, Button } from '@src/core'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Dimensions, Text, ImageBackground, TouchableOpacity, FlatList, Animated } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { dataPhrase } from '../constants'

const { width } = Dimensions.get('window')

interface IProps {
  onPress?: () => void
}

const ConfirmPhrasePage = (props: IProps) => {
  const { t } = useTranslation()
  const { onPress } = props
  const slideDownCode = useRef(new Animated.Value(0)).current
  const [check, setCheck] = useState(false)
  const renderPhrase = ({ item, index }: { item: string, index: number }) => {
    return (
      <View style={styles.itemPhrase}>
        <Text style={styles.textPhrase}>{`${index + 1}. ${item}`}</Text>
      </View>
    )
  }

  function renderHeader() {
    return (
      <>
        <UILabel.Gradient style={styles.title}>{t('your_12_phrase')}</UILabel.Gradient>
        <Text style={styles.title2}>{t('title_phrase')}</Text>

        <ImageBackground
          style={styles.card}
          source={IMAGE.BG_PHRASE}
        >
          <View style={styles.row}>
            <IconHat />
            <Text style={styles.textCard}>{t('please_bote')}</Text>
          </View>
          <Text style={styles.textContent}>{t('title_note')}</Text>
        </ImageBackground>
      </>
    )
  }

  const onShowPhrase = () => {
    Animated.timing(slideDownCode, {
      toValue: horizontalScale(408),
      duration: 500,
      useNativeDriver: false
    }).start(() => {
      setCheck(true)
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.flex} showsVerticalScrollIndicator={false} >
      {renderHeader()}
      <Animated.View style={{ height: slideDownCode }}>
        <FlatList
          contentContainerStyle={styles.listPhrase}
          columnWrapperStyle={styles.wrapColum}
          data={dataPhrase}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderPhrase}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.viewSpace} />}
          scrollEnabled={false}
        />
      </Animated.View>
      {
        !check && <ImageBackground
          style={[styles.card1, styles.marginTop]}
          source={IMAGE.BG_PHRASE1}
        >
          <View style={styles.row}>
            <IconStar />
            <Text style={styles.textCard}>{t('reveal_word_phrase')}</Text>
          </View>
          <Text style={styles.textContent}>{t('title_reveal')}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={onShowPhrase}
          >
            <IconEyeHide />
            <Text style={styles.textBtn}>{t('tap_to_view')}</Text>
          </TouchableOpacity>
        </ImageBackground>
      }

      <View style={styles.btnPadding}>
        <Button.Main
          disabled={!check}
          label={t('i_wrote_it')}
          container={!check ? styles.btnCreate : {}}
          labelStyle={!check ? styles.btnLabel : {}}
          onPress={onPress}
        />
      </View>
    </ScrollView>
  )
}

export default ConfirmPhrasePage

ConfirmPhrasePage.defaultProps = {
  onPress: () => { }
}

const styles = StyleSheet.create({
  flex: {
    flexGrow: 1,
    width,
    paddingHorizontal: horizontalScale(22),
    paddingTop: horizontalScale(30)
  },
  title: {
    fontSize: fontSize(20),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title2: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    lineHeight: fontSize(22),
    textAlign: 'center',
    marginTop: horizontalScale(10),
    marginBottom: horizontalScale(30),
    color: Colors.h656565
  },
  card: {
    height: horizontalScale(142),
    borderRadius: horizontalScale(16),
    padding: horizontalScale(18)
  },
  card1: {
    height: horizontalScale(156),
    borderRadius: horizontalScale(16),
    padding: horizontalScale(18),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textCard: {
    fontSize: fontSize(20),
    fontFamily: Fonts.Helvetica_Bold,
    color: Colors.hFFFFFF,
    marginLeft: horizontalScale(10)
  },
  textContent: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    color: Colors.hB2CAFF,
    marginVertical: horizontalScale(10)
  },
  marginTop: {
    marginTop: horizontalScale(12)
  },
  textContent2: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    color: Colors.hE8D8C0,
    marginVertical: horizontalScale(10)
  },
  btn: {
    height: horizontalScale(48),
    width: horizontalScale(156),
    borderRadius: horizontalScale(24),
    backgroundColor: Colors.hFFFFFF,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBtn: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    color: Colors.h151515,
    marginLeft: horizontalScale(10)
  },
  itemPhrase: {
    width: horizontalScale(136),
    height: horizontalScale(48),
    backgroundColor: Colors.hF5F5F5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: horizontalScale(24)
  },
  textPhrase: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica,
    color: Colors.h151515
  },
  wrapColum: {
    justifyContent: 'space-between'
  },
  viewSpace: {
    height: horizontalScale(12)
  },
  listPhrase: {
    borderWidth: 1,
    borderColor: Colors.hCC8C33,
    borderRadius: horizontalScale(30),
    marginTop: horizontalScale(12),
    padding: horizontalScale(20)
  },
  btnCreate: {
    backgroundColor: Colors.hE3E3E3
  },
  btnLabel: {
    color: Colors.rgba656565
  },
  btnPadding: {
    paddingVertical: horizontalScale(34)
  }
})
