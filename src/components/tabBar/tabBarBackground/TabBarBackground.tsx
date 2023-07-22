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
        colors={['rgba(255, 255, 139, 0.8)', colors.navbar]}
      ></LinearGradient>
    </View>
  )
}

export default TabBarBackground
