import React, { useState } from 'react'

import { ScrollView } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'

import CheckCircle from '@/assets/icons/check-circle.svg'
import RightArrowIcon from '@/assets/icons/right-arrow.svg'
import i18n from '@/locales'
import { CategoryListWithEtcState } from '@/state/CategoryListState'
import { SelectCategoryState } from '@/state/upload/SelectCategoryState'
import { colors } from '@/styles/colors'

import {
  Container,
  DropDownModal,
  DropDownButton,
  TouchableItem,
  Title,
  Styles,
  DropDownText,
} from './DropDown.style'

/**
 * 카테고리 선택에서 사용하는 드롭다운
 */
export const DropDown = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useRecoilState(SelectCategoryState)
  const categoryList = useRecoilValue(CategoryListWithEtcState)
  const [isSelected, setIsSelected] = useState(false)

  /**
   *
   */
  const onSelectCategory = (value: string) => {
    setSelectedCategory(value)
    setIsVisible(false)
  }

  /**
   *
   */
  const handleClick = () => {
    setIsVisible(true)
    setIsSelected(true)
  }

  return (
    <Container>
      {isVisible ? (
        <DropDownModal>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {categoryList.map((category) => (
              <TouchableItem
                key={category}
                onPress={() => onSelectCategory(category)}
              >
                <DropDownText>{i18n.t(`${category}`)}</DropDownText>
                {category === selectedCategory && <CheckCircle />}
              </TouchableItem>
            ))}
          </ScrollView>
        </DropDownModal>
      ) : (
        <DropDownButton
          onPress={handleClick}
          style={isSelected && Styles.selectedContainer}
        >
          <Title style={isSelected && Styles.selectedText}>
            {i18n.t(selectedCategory ? selectedCategory : `noSelectCategory`)}
          </Title>
          <RightArrowIcon color={isSelected ? colors.gray600 : colors.gray100} />
        </DropDownButton>
      )}
    </Container>
  )
}
