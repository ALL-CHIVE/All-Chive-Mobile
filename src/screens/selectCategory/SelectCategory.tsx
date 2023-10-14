import React, { useMemo, useState } from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { FlatList, ListRenderItem } from 'react-native'

import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import ImageButton from '@/components/buttons/imageButton/ImageButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import i18n from '@/locales'
import { Category, GetCategory } from '@/models/enums/Category'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStackParamList'

import { Description, Heading, CategoryList, Header } from './SelectCategory.style'

interface SelectCategoryProps {
  route: RouteProp<RootStackParamList, 'SelectCategory'>
}

/**
 * SelectCategory
 */
const SelectCategory = ({ route }: SelectCategoryProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const categoryList = useMemo(() => GetCategory(), [])
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
        <Header>
          <Heading>{i18n.t('selectCategoryHeading')}</Heading>
          <Description>{i18n.t('chooseMaximum3')}</Description>
        </Header>
        <CategoryList>
          <FlatList
            scrollEnabled={false}
            data={categoryList}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={(category) => category}
          />
        </CategoryList>
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
