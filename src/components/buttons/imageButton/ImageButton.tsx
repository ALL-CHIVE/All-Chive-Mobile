import React, { useState } from 'react'

import { View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

import DesignIcon from '@/assets/icons/design.svg'
import FoodIcon from '@/assets/icons/food.svg'
import HomeLivingIcon from '@/assets/icons/home-living.svg'
import LifeIcon from '@/assets/icons/life.svg'
import SelfImprovementIcon from '@/assets/icons/self-improvement.svg'
import ShoppingIcon from '@/assets/icons/shopping.svg'
import SportIcon from '@/assets/icons/sport.svg'
import TechIcon from '@/assets/icons/tech.svg'
import TrendIcon from '@/assets/icons/trend.svg'
import i18n from '@/locales'
import { Category } from '@/models/enums/Category'
import { colors } from '@/styles/colors'

import { ClickStyles, Container, ImageView, Title } from './ImageButton.style'

interface ImageButtonProps {
  title: Category
  updateSelectedList: (category: Category) => void
  disabled?: boolean
}

/**
 * ImageButton
 */
const ImageButton = ({ title, updateSelectedList, disabled }: ImageButtonProps) => {
  const [isSelected, setIsSelected] = useState(false)

  /**
   * 클릭 동작을 처리합니다
   */
  const handleClick = () => {
    setIsSelected((prev) => !prev)
    updateSelectedList(title)
  }

  return (
    <Container
      onPress={handleClick}
      disabled={disabled}
    >
      <Shadow
        startColor={colors.shadow}
        offset={[0, 2]}
        distance={3}
        style={{ borderRadius: 50, marginBottom: 10 }}
      >
        <ImageView style={isSelected && ClickStyles.image}>{getIcon(title)}</ImageView>
      </Shadow>
      <Title>{i18n.t(title)}</Title>
    </Container>
  )
}

/**
 *
 */
const getIcon = (title: Category) => {
  switch (title) {
    case Category.Food:
      return <FoodIcon />
    case Category.Life:
      return <LifeIcon />
    case Category.HomeLiving:
      return <HomeLivingIcon />
    case Category.Shopping:
      return <ShoppingIcon />
    case Category.Sport:
      return <SportIcon />
    case Category.SelfImprovement:
      return <SelfImprovementIcon />
    case Category.Tech:
      return <TechIcon />
    case Category.Design:
      return (
        <View style={{ width: 46, alignItems: 'flex-end' }}>
          <DesignIcon />
        </View>
      )
    case Category.Trend:
      return <TrendIcon />
  }
}

export default ImageButton
