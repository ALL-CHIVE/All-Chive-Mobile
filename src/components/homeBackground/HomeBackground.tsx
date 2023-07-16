import React from 'react'

import { SafeAreaView } from 'react-native'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { colors } from '@/styles/colors'

interface HomeBackgroundProps {
  children: React.ReactNode
}

/**
 * HomeBackground
 */
const HomeBackground = ({ children }: HomeBackgroundProps) => {
  return (
    <LinearGradient
      style={{ height: Dimensions.get('window').height }}
      colors={[colors.yellow200, colors.white]}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </LinearGradient>
  )
}

export default HomeBackground
