import React, { useState } from 'react'

import { ImageSourcePropType } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

import i18n from '@/locales'
import { colors } from '@/styles/colors'

import { ClickStyles, Container, Image, ImageView, Title } from './ImageButton.style'

interface Props {
  title: string
  updateSelectedList: (category: string) => void
  source: ImageSourcePropType
  disabled?: boolean
}

/**
 * ImageButton
 */
const ImageButton = ({ title, updateSelectedList, source, disabled }: Props) => {
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
        distance={4}
        style={{ borderRadius: 50, marginBottom: 10 }}
      >
        <ImageView style={isSelected && ClickStyles.image}>
          <Image source={source} />
        </ImageView>
      </Shadow>
      <Title>{i18n.t(title)}</Title>
    </Container>
  )
}

export default ImageButton
