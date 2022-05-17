import { ReturnKeyTypeOptions, KeyboardTypeOptions, ImageProps } from 'react-native'

export interface TextInputProps {
  styleTextInput?: object
  value?: string
  placeholder?: string
  placeholderTextColor?: string
  returnKeyType?: ReturnKeyTypeOptions
  keyboardType?: KeyboardTypeOptions
  onChangeText?: () => void
}

export interface FormInputProps extends TextInputProps, ImageProps {
  isShowButton?: boolean
  style?: object
  styleViewInput?: object
  label?: string
  imageSvg?: JSX.Element | undefined
  onPressButton?: () => void
}

export interface TextProps {
  value?: string
  style?: any
  numberOfLines?: number
}

export interface ButtonProps {
  title?: string
  styleTitle?: any
  styleButton?: any
  onPressButton: () => void
}