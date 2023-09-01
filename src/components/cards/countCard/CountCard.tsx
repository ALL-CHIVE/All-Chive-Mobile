import React from 'react'

import LinearGradient from 'react-native-linear-gradient'

import { colors } from '@/styles/colors'

import { Count, Styles, Title } from './CountCard.style'

interface CountCardProps {
  title: string
  count: number
}

/**
 * CountCard
 */
const CountCard = ({ title, count }: CountCardProps) => {
  return (
    <LinearGradient
      style={Styles.container}
      colors={[colors.yellow500Opacity60, colors.mainYellowOpacity60]}
    >
      <Title>{title}</Title>
      <Count>{count}</Count>
    </LinearGradient>
  )
}

export default CountCard
