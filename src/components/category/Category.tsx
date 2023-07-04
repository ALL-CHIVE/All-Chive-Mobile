import React, { useState } from 'react'

import { colors } from '@/styles/colors'

import { CategoryContainer, CategoryStyles, CategoryText } from './Category.style'

interface CategoryProps {
  text: string
  onPress: () => void
}

/**
 *
 */
export const Category = ({ text, onPress }: CategoryProps) => {
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

  return (
    <CategoryContainer
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      underlayColor={colors.mainYellow}
    >
      <CategoryText style={isPressed ? CategoryStyles.click : null}>{text}</CategoryText>
    </CategoryContainer>
  )
}
