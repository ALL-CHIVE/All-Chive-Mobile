import React, { useState } from 'react'

import { ScrollView, Text, TouchableOpacity } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'

import i18n from '@/locales'
import { AllCategoryListState } from '@/state/CategoryListState'
import { SelectCategoryState } from '@/state/upload/SelectCategoryState'

import { Container, DropDownModal, Input, TouchableItem } from './DropDown.style'

/**
 * 카테고리 선택에서 사용하는 드롭다운
 */
export const DropDown = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useRecoilState(SelectCategoryState)
  const allCategoryList = useRecoilValue(AllCategoryListState)

  /**
   *
   */
  const onSelectCategory = (value: string) => {
    setSelectedCategory(value)
    setModalVisible(false)
  }

  return (
    <Container>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {modalVisible ? (
          <DropDownModal>
            <ScrollView nestedScrollEnabled={true}>
              {allCategoryList.map((category) => (
                <TouchableItem
                  key={category}
                  onPress={() => onSelectCategory(i18n.t(`${category}`))}
                >
                  <Text>{i18n.t(`${category}`)}</Text>
                </TouchableItem>
              ))}
            </ScrollView>
          </DropDownModal>
        ) : (
          <Input
            editable={false}
            placeholder={selectedCategory ? `${selectedCategory}` : '카테고리 선택 안함'}
          />
        )}
      </TouchableOpacity>
    </Container>
  )
}
