import { Colors, Fonts, fontSize, horizontalScale, verticalScale } from '@src/core/utils'
import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'

interface IProps {
  container?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  onPress?: () => void;
  disabled?: boolean
}

const ButtonMain = (props: IProps) => {
  const { container, label, labelStyle, onPress, disabled } = props
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.btn, container]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default ButtonMain

ButtonMain.defaultProps = {
  container: {},
  label: '',
  labelStyle: {},
  onPress: () => { },
  disabled: false
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
  }
})