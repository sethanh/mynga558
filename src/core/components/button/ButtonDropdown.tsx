import { Colors, Fonts, fontSize, horizontalScale, IconArrowDown, verticalScale } from '@src/core/utils'
import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ViewStyle, View } from 'react-native'

interface IProps {
  container?: ViewStyle;
  label?: string;
  title?: string;
  onPress?: () => void;
}

const ButtonDropdown = (props: IProps) => {
  const { container, label, title, onPress } = props


  return (
    <View style={[styles.viewContainer, container]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity
        onPress={onPress}
        style={styles.btn}>
        <Text style={[styles.label]}>{label}</Text>
        <IconArrowDown />
      </TouchableOpacity>
    </View>
  )
}

export default ButtonDropdown

ButtonDropdown.defaultProps = {
  container: {},
  label: '',
  title: '',
  onPress: () => { }
}

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%'
  },
  btn: {
    width: '100%',
    borderRadius: horizontalScale(24),
    backgroundColor: Colors.hF5F5F5,
    height: verticalScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.hE3E3E3,
    paddingHorizontal: horizontalScale(18)
  },
  label: {
    fontSize: fontSize(16),
    color: Colors.h151515,
    fontFamily: Fonts.Helvetica
  },
  title: {
    fontSize: fontSize(15),
    color: Colors.h656565,
    fontFamily: Fonts.Helvetica_Bold,
    marginLeft: horizontalScale(18),
    marginBottom: horizontalScale(4)
  }
})