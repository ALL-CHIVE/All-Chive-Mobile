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
      style={{ height: Dimensions.get('window').height, position: 'relative' }}
      colors={[colors.yellow200, colors.white]}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </LinearGradient>
  )
}

export default HomeContainer
