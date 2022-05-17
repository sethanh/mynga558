import { ErrorMessage } from '@hookform/error-message'
import React, { useCallback, useState } from 'react'
import { useController, useFormContext, useFormState } from 'react-hook-form'
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  TextStyle
} from 'react-native'
import {
  Colors,
  horizontalScale,
  verticalScale,
  fontSize,
  IconEye,
  IconEyeHide,
  IconError,
  Fonts
} from '../../utils'

type Props = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  name: string
  label?: string
  leftIcon?: ImageSourcePropType
  labelStyle?: StyleProp<TextStyle>
  isOptional?: boolean
}

const HFPasswordInput = (props: Props) => {
  const { containerStyle, contentStyle, leftIcon, style, name, label, labelStyle, isOptional, ...rest } = props
  const formContext = useFormContext()
  const { field } = useController({
    name,
    control: formContext.control,
    defaultValue: '',
  })

  const { errors } = useFormState({
    control: formContext.control,
  })

  const [isSecure, setSecure] = useState(true)
  const handlePress = useCallback(() => {
    setSecure(!isSecure)
  }, [isSecure])

  return (
    <View style={containerStyle}>
      {label && <Text style={[styles.label, labelStyle]}>{label} {isOptional && <Text style={styles.colorRed}>*</Text>}</Text>}
      <View style={[styles.content, contentStyle]}>
        {leftIcon && <Image source={leftIcon} style={styles.iconLeft} />}
        <TextInput
          {...rest}
          style={[styles.input, style]}
          numberOfLines={1}
          secureTextEntry={isSecure}
          contextMenuHidden
          value={field.value}
          onChangeText={field.onChange}
        />
        <TouchableOpacity style={styles.action} onPress={handlePress}>
          {isSecure ? <IconEyeHide /> : <IconEye />}
        </TouchableOpacity>
      </View>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => {
          return <View style={styles.contentError}>
            <IconError />
            <Text style={styles.error}>{message}</Text>
          </View>
        }}
      />
    </View>
  )
}

HFPasswordInput.displayName = 'Form.PasswordInput'

HFPasswordInput.defaultProps = {
  containerStyle: {},
  contentStyle: {},
  label: null,
  leftIcon: null,
  labelStyle: {},
  isOptional: false
}

export default HFPasswordInput

export { HFPasswordInput }

const styles = StyleSheet.create({
  label: {
    color: Colors.LABEL.BLACK,
    fontSize: fontSize(14),
    marginBottom: verticalScale(5),
  },
  content: {
    alignItems: 'center',
    borderRadius: horizontalScale(24),
    backgroundColor: Colors.BASE_COLOR.hE9EBEC,
    height: horizontalScale(48),
    paddingLeft: horizontalScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: fontSize(16),
    color: Colors.TEXTINPUT.COLOR,
    padding: 0,
    marginRight: horizontalScale(15),
  },
  iconLeft: {
    height: horizontalScale(20),
    marginRight: horizontalScale(14),
  },
  action: {
    height: '100%',
    paddingRight: horizontalScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: fontSize(12),
    lineHeight: horizontalScale(14),
    color: 'red',
    marginLeft: horizontalScale(5),
    fontFamily: Fonts.Helvetica
  },
  colorRed: {
    color: 'red',
  },
  contentError: {
    borderRadius: horizontalScale(14),
    backgroundColor: '#FDEEEB',
    // height: horizontalScale(28),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(18),
    marginTop: horizontalScale(13),
    paddingVertical: horizontalScale(5)
  }
})
