import { IMAGE } from '@src/core'
import { Colors, Fonts, fontSize, heightSatusbar, horizontalScale, IconBack } from '@src/core/utils'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, StatusBar, ImageBackground, View, TouchableOpacity, Text,ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

interface ContainerProps {
  children: JSX.Element | JSX.Element[] | null
  headerShow?: boolean
  title?: string
  step?: number | null
  IconRight?: React.FC<SvgProps>
  styleRight?: ViewStyle
  onPressRight?:()=> void
}

const ContainerMain = (props: ContainerProps) => {
  const { children, headerShow, title, step, IconRight, styleRight, onPressRight } = props
  const navigation = useNavigation()

  const onPressGoBack = () => {
    navigation.goBack()
  }

  return (
    <ImageBackground
      style={styles.container}
      source={IMAGE.BG_MAIN}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {
        headerShow && <View style={styles.content}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={onPressGoBack}
          >
            <IconBack />
          </TouchableOpacity>
          {
            step !== null ?
              <View style={styles.viewStep}>
                <View style={[styles.dot, { backgroundColor: step && step >= 1 ? Colors.hF8D247 : Colors.h656565 }]} />
                <View style={[styles.line, { backgroundColor: step && step >= 2 ? Colors.hF8D247 : Colors.h656565 }]} />
                <View style={[styles.dot, { backgroundColor: step && step >= 2 ? Colors.hF8D247 : Colors.h656565 }]} />
                <View style={[styles.line, { backgroundColor: step && step >= 3 ? Colors.hF8D247 : Colors.h656565 }]} />
                <View style={[styles.dot, { backgroundColor: step && step >= 3 ? Colors.hF8D247 : Colors.h656565 }]} />
              </View>
              : <Text style={styles.label}>{title}</Text>

          }
          {IconRight&&<TouchableOpacity
            style={styleRight}
            onPress={onPressRight}
          >
            <IconRight />
          </TouchableOpacity>}
        </View>
      }
      {children}
    </ImageBackground>
  )
}

export default ContainerMain

ContainerMain.defaultProps = {
  headerShow: false,
  title: '',
  step: null,
  IconRight:null,
  styleRight:{},
  onPressRight:()=>{}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: horizontalScale(24),
    paddingTop: heightSatusbar + horizontalScale(15),
    alignItems: 'center'
  },
  label: {
    color: Colors.hFFFFFF,
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica_Bold,
  },
  btnBack: {
    position: 'absolute',
    top: heightSatusbar + horizontalScale(15),
    left: horizontalScale(24)
  },
  dot: {
    width: horizontalScale(9),
    height: horizontalScale(9),
    borderRadius: horizontalScale(4.5)
  },
  line: {
    height: horizontalScale(1),
    backgroundColor: Colors.h656565,
    width: horizontalScale(75)
  },
  viewStep: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: horizontalScale(6)
  }
})