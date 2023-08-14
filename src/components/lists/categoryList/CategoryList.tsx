import React from 'react'

import i18n from '@/locales'
import { Category } from '@/models/enums/Category'

import { Button, ClickStyles, ScrollContainer, Text } from './CategoryList.style'

interface CategoryListProps {
  currentCategory: Category | string
  setCurrentCategory: React.Dispatch<React.SetStateAction<Category | string>>
  options: Category[]
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
  const handleOptionPress = (option: Category) => {
    setCurrentCategory(option)
  }

  return (
    <ScrollContainer
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {options.map((option, index) => (
        <Button
          key={index}
          onPress={() => handleOptionPress(option)}
          style={currentCategory === option && ClickStyles.category}
        >
          <Text style={currentCategory === option && ClickStyles.text}>{i18n.t(option)}</Text>
        </Button>
      ))}
    </ScrollContainer>
  )
}
