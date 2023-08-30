import React from 'react'

import { ActivityIndicator } from 'react-native'

import { colors } from '@/styles/colors'

import { Container } from './Indicator.style'

/**
 *
 */
const Indicator = () => {
  return (
    <Container>
      <ActivityIndicator
        size={'large'}
        color={colors.gray400}
      />
    </Container>
  )
}

export default Indicator
