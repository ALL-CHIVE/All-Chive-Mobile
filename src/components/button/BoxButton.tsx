import React, { useState } from 'react'

import { colors } from '@/styles/colors'

import { BoxButtonContainer, BoxButtonStyles, BoxButtonText } from './BoxButton.style'

/**
 *
 */

interface BoxButtonProps {
  text: string
  onPress: () => void
  buttonStyle: 'default' | 'disabled'
}

/**
 *
 */
export const BoxButton = (props: BoxButtonProps) => {
  const { text, onPress, buttonStyle } = props
  const [isPressed, setIsPressed] = useState(false)

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

  /**
   *
   */
  const handleButtonStyle = () => {
    switch (buttonStyle) {
      case 'default':
        return isPressed ? BoxButtonStyles.click : BoxButtonStyles.default
      case 'disabled':
        return BoxButtonStyles.disabled
    }
  }

  return (
    <BoxButtonContainer
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={handleButtonStyle()}
      onPress={onPress}
      underlayColor={colors.yellow500}
    >
      <BoxButtonText style={handleButtonStyle()}>{text}</BoxButtonText>
    </BoxButtonContainer>
  )
}
