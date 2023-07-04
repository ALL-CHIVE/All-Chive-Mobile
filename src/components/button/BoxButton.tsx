import React from 'react'

import { colors } from '@/styles/colors'

import { BoxButtonContainer, BoxButtonStyles, BoxButtonText } from './BoxButton.style'

interface BoxButtonProps {
  text: string
  onPress: () => void
  isDisabled?: boolean
}
/**
 *
 */
export const BoxButton = ({ text, onPress, isDisabled }: BoxButtonProps) => {
  return (
    <BoxButtonContainer
      style={isDisabled ? BoxButtonStyles.disabled : null}
      onPress={onPress}
      disabled={isDisabled}
      underlayColor={colors.yellow500}
    >
      <BoxButtonText style={isDisabled ? BoxButtonStyles.disabled : null}>{text}</BoxButtonText>
    </BoxButtonContainer>
  )
}
