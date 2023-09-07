import { NativeScrollEvent } from 'react-native'

/**
 * isCloseToBottom
 */
export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  const paddingToBottom = 1000
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
}
