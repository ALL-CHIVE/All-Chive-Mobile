import React, { useState } from 'react'

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
  const [, setIsPressed] = useState(false)
  /**
   *
   */
  const handlePressIn = () => {
    setIsPressed(true)
  }

  /**
   *
   */
  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <BoxButtonContainer
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={isDisabled ? BoxButtonStyles.disabled : null}
      onPress={onPress}
      disabled={isDisabled}
      underlayColor={colors.yellow500}
    >
      <BoxButtonText style={isDisabled ? BoxButtonStyles.disabled : null}>{text}</BoxButtonText>
    </BoxButtonContainer>
  )
}
