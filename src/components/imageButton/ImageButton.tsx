import React, { useState } from 'react'

import i18n from '@/locales'

import { ClickStyles, Container, Image, Title } from './ImageButton.style'

interface Props {
  title: string
  updateSelectedList: (subject: string) => void
  disabled?: boolean
}

/**
 * ImageButton
 */
const ImageButton = ({ title, updateSelectedList, disabled }: Props) => {
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
      <Image style={isSelected && ClickStyles.image}>{/* TODO: 주제 아이콘 추가 */}</Image>
      <Title>{i18n.t(title)}</Title>
    </Container>
  )
}

export default ImageButton
