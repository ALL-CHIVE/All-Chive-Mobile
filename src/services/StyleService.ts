import { Appearance } from 'react-native'

import { colors } from '@/styles/colors'

/**
 *
 */
export const getActionSheetTintColor = () => {
  return Appearance.getColorScheme() === 'light' ? colors.gray600 : colors.gray100
}
