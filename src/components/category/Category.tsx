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
export const Category = (props: CategoryProps) => {
  const { text, onPress } = props
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
  const handleCategoryStyle = () => {
    if (isPressed) {
      return CategoryStyles.click
    } else {
      return CategoryStyles.default
    }
  }

  return (
    <CategoryContainer
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={handleCategoryStyle()}
      onPress={onPress}
      underlayColor={colors.mainYellow}
    >
      <CategoryText style={handleCategoryStyle()}>{text}</CategoryText>
    </CategoryContainer>
  )
}
