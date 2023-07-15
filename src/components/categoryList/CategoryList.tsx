import React, { useState } from 'react'

import { useRecoilState } from 'recoil'

import i18n from '@/locales'
import { CategoryState } from '@/state/CategoryState'

import { Category, ClickStyles, Container, Text } from './CategoryList.style'

interface CategoryListProps {
  options: string[]
  onPress: (value: string) => void
}

/**
 * CategoryList
 */
export const CategoryList = ({ options, onPress }: CategoryListProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('all')
  const [, setCurrentCategory] = useRecoilState(CategoryState)

  /**
   * handleOptionPress
   */
  const handleOptionPress = (option: string) => {
    setSelectedOption(option)
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
          style={selectedOption === option && ClickStyles.category}
        >
          <Text style={selectedOption === option && ClickStyles.text}>{i18n.t(option)}</Text>
        </Category>
      ))}
    </Container>
  )
}
