import React, { useState } from 'react'

import { ListRenderItem, ScrollView } from 'react-native'
import { useRecoilValue } from 'recoil'

import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/button/BoxButton'
import ImageButton from '@/components/imageButton/ImageButton'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { CategoryListState } from '@/state/CategoryListState'

import { Container, Description, Heading, CategoryList } from './SelectCategory.style'

interface SelectCategoryProps {
  navigation: MainNavigationProp
}

/**
 * SelectCategory
 */
const SelectCategory = ({ navigation }: SelectCategoryProps) => {
  const categoryList = useRecoilValue(CategoryListState)
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])

  /**
   * 주제 선택을 처리합니다.
   */
  const handleCategoryPress = (category: string) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(
        selectedCategory.filter((selectedCategory) => selectedCategory !== category)
      )
    } else if (selectedCategory.length < 3) {
      setSelectedCategory((prev) => [...prev, category])
    }
  }

  /**
   * 선택 완료 버튼 클릭 액션을 처리합니다.
   */
  const handleSubmitCategory = () => {
    // TODO: api 전달
    navigation.navigate('AddProfile')
  }

  /**
   * CategoryList 내 아이템을 반환합니다
   */
  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <ImageButton
        title={item}
        updateSelectedList={handleCategoryPress}
        source={defaultIcons[item]}
        disabled={selectedCategory.length >= 3 && !selectedCategory.includes(item)}
      />
    )
  }

  return (
    <ScrollView>
      <Container>
        <Heading>{i18n.t('niceMeetYouWhatIsYourHobby')}</Heading>
        <Description>{i18n.t('chooseMaximum3')}</Description>
        <CategoryList
          scrollEnabled={false}
          data={categoryList}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(category) => category}
        />
        <BoxButton
          textKey="selectCompleted"
          onPress={handleSubmitCategory}
          isDisabled={selectedCategory.length <= 0}
        />
      </Container>
    </ScrollView>
  )
}

export default SelectCategory
