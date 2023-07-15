import React from 'react'

import i18n from '@/locales'
import { colors } from '@/styles/colors'

import { Container, Button, Text, DisabledStyles } from './BoxButton.style'

interface BoxButtonProps {
  textKey: string
  onPress: () => void
  isDisabled?: boolean
}
/**
 * BoxButton
 */
export const BoxButton = ({ textKey, onPress, isDisabled }: BoxButtonProps) => {
  return (
    <Container>
      <Button
        style={isDisabled && DisabledStyles.button}
        onPress={onPress}
        disabled={isDisabled}
        underlayColor={colors.yellow500}
      >
        <Text style={isDisabled && DisabledStyles.text}>{i18n.t(textKey)}</Text>
      </Button>
    </Container>
  )
}
