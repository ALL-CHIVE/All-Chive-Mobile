import React from 'react'

import i18n from '@/locales'

import { Category, ClickStyles, ScrollContainer, Text } from './CategoryList.style'

interface CategoryListProps {
  currentCategory: string
  setCurrentCategory: (option: string) => void
  options: string[]
}

/**
 * CategoryList
 */
export const CategoryList = ({
  currentCategory,
  setCurrentCategory,
  options,
}: CategoryListProps) => {
  /**
   * handleOptionPress
   */
  const handleOptionPress = (option: string) => {
    setCurrentCategory(option)
  }

  return (
    <ScrollContainer
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {options.map((option, index) => (
        <Category
          key={index}
          onPress={() => handleOptionPress(option)}
          style={currentCategory === option && ClickStyles.category}
        >
          <Text style={currentCategory === option && ClickStyles.text}>{i18n.t(option)}</Text>
        </Category>
      ))}
    </ScrollContainer>
  )
}
