import React, { useState } from 'react'

import { ScrollView, Text } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'

import i18n from '@/locales'
import { CategoryListState } from '@/state/CategoryListState'
import { SelectCategoryState } from '@/state/upload/SelectCategoryState'

import {
  Container,
  DropDownModal,
  CategoryContainer,
  TouchableItem,
  CategoryTitle,
} from './DropDown.style'

/**
 * 카테고리 선택에서 사용하는 드롭다운
 */
export const DropDown = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useRecoilState(SelectCategoryState)
  const categoryList = useRecoilValue(CategoryListState)

  /**
   *
   */
  const onSelectCategory = (value: string) => {
    setSelectedCategory(value)
    setIsVisible(false)
  }

  return (
    <Container
      onPress={() => {
        setIsVisible(true)
      }}
    >
      {isVisible ? (
        <DropDownModal>
          <ScrollView nestedScrollEnabled={true}>
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            {categoryList.map((category) => (
              <TouchableItem
                key={category}
                onPress={() => onSelectCategory(`${category}`)}
              >
                <Text>{i18n.t(`${category}`)}</Text>
              </TouchableItem>
            ))}
          </ScrollView>
        </DropDownModal>
      ) : (
        <CategoryContainer>
          <CategoryTitle>
            {i18n.t(selectedCategory ? selectedCategory : `noSelectCategory`)}
          </CategoryTitle>
        </CategoryContainer>
      )}
    </Container>
  )
}
