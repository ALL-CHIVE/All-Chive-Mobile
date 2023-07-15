import React from 'react'

import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { colors } from '@/styles/colors'

import { Styles } from './TabBarBackground.style'

/**
 *
 */
const TabBarBackground = () => {
  return (
    <View>
      <LinearGradient
        style={Styles.linearGradient}
        colors={[colors.white, colors.mainYellow]}
      ></LinearGradient>
    </View>
  )
}

export default TabBarBackground
