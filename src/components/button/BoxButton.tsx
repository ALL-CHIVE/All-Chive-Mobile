import React, { useState } from 'react'

import { Text } from 'react-native'

import { colors } from '@/styles/colors'

import { BoxButtonContainer, BoxButtonStyles } from './BoxButton.style'

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
    if (isPressed && buttonStyle === 'default') {
      return BoxButtonStyles.click
    } else if (buttonStyle === 'disabled') {
      return BoxButtonStyles.disabled
    } else {
      return BoxButtonStyles.default
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
      <Text style={handleButtonStyle()}>{text}</Text>
    </BoxButtonContainer>
  )
}
