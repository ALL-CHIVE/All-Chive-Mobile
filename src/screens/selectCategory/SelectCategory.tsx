import React, { useState } from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { ListRenderItem, View } from 'react-native'
import { useRecoilValue } from 'recoil'

import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import ImageButton from '@/components/buttons/imageButton/ImageButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import i18n from '@/locales'
import { Category } from '@/models/enums/Category'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { CategoryListState } from '@/state/CategoryListState'

import { Description, Heading, CategoryList, Container } from './SelectCategory.style'

interface SelectCategoryProps {
  route: RouteProp<RootStackParamList, 'SelectCategory'>
}

/**
 * SelectCategory
 */
const SelectCategory = ({ route }: SelectCategoryProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const categoryList = useRecoilValue(CategoryListState)
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([])

  /**
   * 주제 선택을 처리합니다.
   */
  const handleCategoryPress = (category: Category) => {
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
    navigation.navigate('AddProfile', {
      type: route.params.type,
      categories: selectedCategory,
      marketingAgreement: route.params.marketingAgreement,
    })
  }

  /**
   * CategoryList 내 아이템을 반환합니다
   */
  const renderItem: ListRenderItem<Category> = ({ item }) => {
    return (
      <ImageButton
        title={item}
        updateSelectedList={handleCategoryPress}
        disabled={selectedCategory.length >= 3 && !selectedCategory.includes(item)}
      />
    )
  }

  return (
    <DefaultContainer>
      <DefaultScrollContainer>
        <Container>
          <View>
            <Heading>{i18n.t('selectCategoryHeading')}</Heading>
            <Description>{i18n.t('chooseMaximum3')}</Description>
          </View>
          <CategoryList
            scrollEnabled={false}
            data={categoryList}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={(category) => category}
          />
        </Container>
      </DefaultScrollContainer>
      <BoxButton
        textKey={i18n.t('next')}
        onPress={handleSubmitCategory}
        isDisabled={selectedCategory.length <= 0}
      />
    </DefaultContainer>
  )
}

export default SelectCategory
