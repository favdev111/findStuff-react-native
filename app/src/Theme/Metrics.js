/**
 * This file contains metric values that are global to the application.
 */
import {Dimensions, Platform, StatusBar} from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

// constants
const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
const GUTTER_WIDTH_PERCENT = 2.6667 / 100
const GUTTER_WIDTH = DEVICE_WIDTH * GUTTER_WIDTH_PERCENT
const SAFE_AREA_INSETS_BOTTOM =
  Platform.OS === 'ios' ? StaticSafeAreaInsets.safeAreaInsetsBottom : 0
// const BOTTOM_NAV_BAR_HEIGHT = applyRatio(80) - StaticSafeAreaInsets.safeAreaInsetsBottom
const BOTTOM_NAV_BAR_HEIGHT = applyRatio(60)

const BORDER_SAFE_WIDTH = applyRatio(21)

const HEADER_BAR_HEIGHT = Platform.select({
  ios: applyRatio(70) + getStatusBarHeight(),
  android: applyRatio(70) + StatusBar.currentHeight,
})
const HEADER_BAR_HEIGHT_COMPACT = HEADER_BAR_HEIGHT * 0.75
const HEADER_ICON_SIZE = applyRatio(20)
const ANIMATION_TAB_HEIGHT = applyRatio(61)
const HEIGHT_FOR_TABS = applyRatio(40)
const UPLOAD_IMAGE_HEIGHT = 600
const UPLOAD_IMAGE_WIDTH = 1002
const UPLOAD_LOGO_SIZE = 400
function applyRatio(pointsSize) {
  return (DEVICE_WIDTH * pointsSize) / 375
  //   return pointsSize
}

function applyRatioWithWidth(widthSize) {
  return (DEVICE_WIDTH * widthSize) / 474
  //   return pointsSize
}
export default {
  // Examples of metrics you can define:
  // baseMargin: 10,
  // largeMargin: 20,
  // smallMargin: 5,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  GUTTER_WIDTH,
  BOTTOM_NAV_BAR_HEIGHT,
  HEADER_BAR_HEIGHT,
  HEADER_BAR_HEIGHT_COMPACT,
  HEADER_ICON_SIZE,
  HEIGHT_FOR_TABS,
  BORDER_SAFE_WIDTH,
  UPLOAD_IMAGE_HEIGHT,
  UPLOAD_IMAGE_WIDTH,
  UPLOAD_LOGO_SIZE,
  applyRatio,
  applyRatioWithWidth,
  ANIMATION_TAB_HEIGHT,
  SAFE_AREA_INSETS_BOTTOM,
}
