import { Dimensions, NativeModules, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width]

const guidelineBaseWidth = 375
const guidelineBaseHeight = 812
const { StatusBarManager } = NativeModules
const heightSatusbar = StatusBarManager.HEIGHT

const horizontalScale = (size: number) => (shortDimension / guidelineBaseWidth) * size
const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor
// scale fontsize
const scaleWidth = width / guidelineBaseWidth
const scaleHeight = height / guidelineBaseHeight
const scale = Math.min(scaleWidth, scaleHeight)
const fontSize =
  (size: number) => Math.ceil((size * scale))

const isTablet = DeviceInfo.isTablet()
const isIOS = Platform.OS === 'ios'
export { horizontalScale, verticalScale, moderateScale, fontSize, heightSatusbar, isTablet, isIOS }
