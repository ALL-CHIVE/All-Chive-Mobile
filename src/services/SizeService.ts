import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

/**
 * 윈도우 너비가 주어진 width보다 더 작은지 확인합니다.
 */
export const isWindowWidthSmallerThen = (width: number) => {
  return windowWidth < width
}
