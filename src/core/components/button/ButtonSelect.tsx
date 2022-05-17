import { Colors, horizontalScale, IconTick } from '@src/core/utils'
import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface IProps {
  value: boolean
  onPress?: () => void
}

const ButtonSelect = (props: IProps) => {
  const { value, onPress } = props

  const data = useMemo(() => {
    return value
  }, [value])

  return (
    <TouchableOpacity
      style={data ? styles.btnActive : styles.btnInactive}
      onPress={onPress}
    >
      {data ? <IconTick /> : null}
    </TouchableOpacity>
  )
}

export default ButtonSelect

ButtonSelect.defaultProps = {
  onPress: () => { },
}

const styles = StyleSheet.create({
  btnInactive: {
    width: horizontalScale(20),
    height: horizontalScale(20),
    borderWidth: 2,
    borderColor: Colors.h656565,
    borderRadius: horizontalScale(2)
  },
  btnActive: {
    width: horizontalScale(20),
    height: horizontalScale(20),
    borderRadius: horizontalScale(2),
    backgroundColor: Colors.h96481B,
    justifyContent: 'center',
    alignItems: 'center'
  }
})