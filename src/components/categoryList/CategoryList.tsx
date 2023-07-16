import React from 'react'

import { useSetRecoilState } from 'recoil'

import i18n from '@/locales'
import { CategoryState } from '@/state/CategoryState'

import { Category, ClickStyles, Container, Text } from './CategoryList.style'

interface CategoryListProps {
  currentCategory: string
  options: string[]
  onPress: (value: string) => void
}

/**
 * CategoryList
 */
export const CategoryList = ({ currentCategory, options, onPress }: CategoryListProps) => {
  const setCurrentCategory = useSetRecoilState(CategoryState)

  /**
   * handleOptionPress
   */
  const handleOptionPress = (option: string) => {
    onPress(option)
    setCurrentCategory(option)
  }

  return (
    <Container
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
    </Container>
  )
}
