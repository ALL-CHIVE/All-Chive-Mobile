import React from 'react'

import { SafeAreaView } from 'react-native'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { colors } from '@/styles/colors'

interface HomeContainerProps {
  children: React.ReactNode
}

/**
 * HomeContainer
 */
const HomeContainer = ({ children }: HomeContainerProps) => {
  return (
    <LinearGradient
      style={{ height: Dimensions.get('window').height }}
      colors={[colors.yellow200, colors.white]}
      locations={[0.1, 0.45]}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </LinearGradient>
  )
}

export default HomeContainer
