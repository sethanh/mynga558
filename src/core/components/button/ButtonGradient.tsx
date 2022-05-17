import { Colors, Fonts, fontSize, horizontalScale, verticalScale } from '@src/core/utils'
import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface IProps {
  container?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  onPress?: () => void;
  disabled?: boolean;
  gradientColor?: string[]
}

const ButtonGradient = (props: IProps) => {
  const { container, label, labelStyle, onPress, disabled, gradientColor } = props
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.buttonWitdh, container]}
    >
      <LinearGradient
        colors={gradientColor || Colors.gradientDefault}
        style={styles.btn}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default ButtonGradient

ButtonGradient.defaultProps = {
  container: {},
  label: '',
  labelStyle: {},
  onPress: () => { },
  disabled: false,
  gradientColor: Colors.gradientDefault
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    borderRadius: horizontalScale(24),
    backgroundColor: Colors.h000000,
    height: verticalScale(48),
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: fontSize(16),
    color: Colors.hFFFFFF,
    fontFamily: Fonts.Helvetica_Bold
  },
  buttonWitdh: {
    width: '100%'
  }
})