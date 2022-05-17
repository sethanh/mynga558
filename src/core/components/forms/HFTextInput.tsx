import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { useController, useFormContext, useFormState } from 'react-hook-form'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  ImageSourcePropType,
  Image,
  TextStyle,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'
import { Colors, horizontalScale, verticalScale, fontSize, IconCheck } from '../../utils'

type Props = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  name: string
  label?: string
  leftIcon?: ImageSourcePropType
  valueCode?: string
  check?: boolean
  RightIcon?: React.FC<SvgProps>
  keyboardType?: string
  onRightPress?: () => void
}

const HFTextInput = (props: Props) => {
  const { containerStyle, contentStyle, style, leftIcon, name, label, valueCode, labelStyle, RightIcon, check, keyboardType, onRightPress, ...rest } = props
  const formContext = useFormContext()
  const { field } = useController({
    name,
    control: formContext.control,
    defaultValue: '',
  })
  const { errors } = useFormState({
    control: formContext.control,
  })

  return (
    <View style={containerStyle}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.content, contentStyle]}>
        {valueCode && <Text style={styles.textValueCode}>{valueCode}</Text>}
        {leftIcon && <Image source={leftIcon} style={styles.iconLeft} />}
        <TextInput
          {...rest}
          style={[styles.input, style]}
          value={field.value}
          onChangeText={field.onChange}
          placeholderTextColor={Colors.TEXTINPUT.PLACEHOLDER}
          keyboardType= {keyboardType||'default'}
        />
        {check && (
          <TouchableOpacity
            onPress={onRightPress}
          >
            {RightIcon ? <RightIcon style={styles.iconCheck} /> : <IconCheck style={styles.iconCheck} />}

          </TouchableOpacity>
        )}
      </View>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => {
          return <Text style={styles.error}>{message}</Text>
        }}
      />
    </View>
  )
}

HFTextInput.defaultProps = {
  containerStyle: {},
  contentStyle: {},
  label: null,
  valueCode: null,
  leftIcon: null,
  check: false,
  labelStyle: null,
  RightIcon: null,
  keyboardType: 'default',
  onRightPress: () => { }
}

export default HFTextInput
export { HFTextInput }

const styles = StyleSheet.create({
  label: {
    color: Colors.LABEL.BLACK,
    fontSize: fontSize(14),
    marginBottom: verticalScale(5),
  },
  content: {
    alignItems: 'center',
    borderRadius: horizontalScale(24),
    backgroundColor: Colors.TEXTINPUT.BG,
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
  error: {
    fontSize: fontSize(12),
    lineHeight: fontSize(14),
    color: 'red',
    marginTop: verticalScale(8),
  },
  textValueCode: {
    fontSize: fontSize(16),
    color: Colors.BASE_COLOR.BASE_TEXT,
    marginRight: horizontalScale(5),
  },
  iconLeft: {
    height: horizontalScale(20),
    marginRight: horizontalScale(14),
  },
  iconCheck: {
    marginRight: horizontalScale(14)
  }
})
