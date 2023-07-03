import React, { useState } from 'react'

import { Text } from 'react-native'

import { colors } from '@/styles/colors'

import { CategoryContainer, CategoryStyles } from './Category.style'

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
      return CategoryStyles.hover
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
      <Text style={handleCategoryStyle()}>{text}</Text>
    </CategoryContainer>
  )
}
