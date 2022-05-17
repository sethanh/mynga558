import { Colors, Fonts, fontSize, heightSatusbar, horizontalScale, IconBack } from '@src/core/utils'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, StatusBar, View, TouchableOpacity, Text } from 'react-native'

interface ContainerProps {
  children: JSX.Element | JSX.Element[] | null
  headerShow?: boolean
  title?: string
}

const ContainerProfile = (props: ContainerProps) => {
  const { children, headerShow, title } = props
  const navigation = useNavigation()

  const onPressGoBack = () => {
    navigation.goBack()
  }

  return (
    <View
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {
        headerShow && <View style={styles.content}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={onPressGoBack}
          >
            <IconBack />
          </TouchableOpacity>

          <Text style={styles.label}>{title}</Text>
        </View>
      }
      {children}
    </View>
  )
}

export default ContainerProfile

ContainerProfile.defaultProps = {
  headerShow: false,
  title: '',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASE_COLOR.GRAY
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
  }
})