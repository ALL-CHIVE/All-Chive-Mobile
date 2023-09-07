import { Dimensions, Platform } from 'react-native'
import AndroidDimensions from 'react-native-extra-dimensions-android'

const windowWidth = Dimensions.get('window').width

/**
 * 윈도우 너비가 주어진 width보다 더 작은지 확인합니다.
 */
export const isWindowWidthSmallerThen = (width: number) => {
  return windowWidth < width
}

/**
 *  모달 최대 높이입니다.
 */
export const modalMaxHeight = Platform.select({
  ios: Dimensions.get('screen').height - 80,
  android: Dimensions.get('screen').height - 150,
})

/**
 *
 */
export const getDeviceHeight = () => {
  switch (Platform.OS) {
    case 'android':
      return AndroidDimensions?.get('REAL_WINDOW_HEIGHT')
    default:
      return Dimensions.get('window').height
  }
}
