import { Colors, Fonts, fontSize, heightSatusbar, horizontalScale, IconBlackBack, IconClock, isIOS } from '@src/core/utils'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, StatusBar, View, TouchableOpacity, Text, Image, Switch } from 'react-native'

interface ContainerProps {
  children: JSX.Element | JSX.Element[] | null
  title?: string
  showHeaderWallet?: boolean
  name?: string
  statusSwitch?: boolean
  onSwitch?: () => void
}

const ContainerWallet = (props: ContainerProps) => {
  const { children, title, showHeaderWallet, name, statusSwitch, onSwitch } = props
  const navigation = useNavigation()
  const transformToggle = isIOS ? [{ scaleX: .6 }, { scaleY: .6 }] : [{ scaleX: .8 }, { scaleY: .8 }]

  const onPressGoBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={[styles.content, { justifyContent: showHeaderWallet ? 'space-between' : 'center' }]}>

        {
          showHeaderWallet ? (
            <>
              <View style={styles.row}>
                <Image
                  style={styles.styleAvar}
                  source={{ uri: 'https://images.unsplash.com/photo-1644982647711-9129d2ed7ceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60' }}
                />
                <Text numberOfLines={1} style={styles.name}>{name}</Text>
              </View>

              <View style={styles.row}>
                <IconClock />

                <View style={styles.btnSwitch}>
                  <Switch
                    trackColor={{ true: Colors.h96481B }}
                    thumbColor={Colors.hEFE4DD}
                    ios_backgroundColor={Colors.h96481B}
                    onValueChange={onSwitch}
                    value={statusSwitch}
                    style={{ transform: transformToggle }}
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={onPressGoBack}
              >
                <IconBlackBack />
              </TouchableOpacity>
              <Text style={styles.label}>{title}</Text>
            </>
          )
        }

      </View>
      {children}
    </View>
  )
}

export default ContainerWallet

ContainerWallet.defaultProps = {
  title: '',
  showHeaderWallet: false,
  name: '',
  statusSwitch: false,
  onSwitch: () => { }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.hEFE4DD
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(22),
    paddingTop: heightSatusbar + horizontalScale(15),
  },
  label: {
    color: Colors.h000000,
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center'
  },
  btnBack: {
    position: 'absolute',
    top: heightSatusbar + horizontalScale(15),
    left: horizontalScale(24)
  },
  name: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica_Bold,
    color: Colors.h151515,
    lineHeight: fontSize(22),
    marginLeft: horizontalScale(10),
    maxWidth: horizontalScale(170)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnSwitch: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: horizontalScale(15),
    marginLeft: horizontalScale(10),
    backgroundColor: Colors.hDDC5B6,
    borderRadius: horizontalScale(12)
  },
  styleAvar: {
    height: horizontalScale(40),
    width: horizontalScale(40),
    borderRadius: horizontalScale(20)
  }
})