import React, { useState } from 'react'

import { View } from 'react-native'
import { useRecoilState } from 'recoil'

import i18n from '@/locales'
import { CategoryState } from '@/state/CategoryState'

import { Container, Styles, Text } from './Category.style'

interface CategoryProps {
  options: string[]
  onPress: (value: string) => void
}

/**
 *
 */
export const Category = ({ options, onPress }: CategoryProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [, setCurrentCategory] = useRecoilState(CategoryState)

  /**
   *
   */
  const handleOptionPress = (option: string) => {
    setSelectedOption(option)
    onPress(option)
    setCurrentCategory(option)
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {options.map((option, index) => (
        <Container
          key={index}
          onPress={() => handleOptionPress(option)}
          style={selectedOption === option ? Styles.click : null}
        >
          <Text style={selectedOption === option ? Styles.click : null}>{i18n.t(option)}</Text>
        </Container>
      ))}
    </View>
  )
}
