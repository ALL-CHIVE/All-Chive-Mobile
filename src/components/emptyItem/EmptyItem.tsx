import React from 'react'

import { Image } from 'react-native'

import { defaultImages } from '@/assets'
import i18n from '@/locales'

import { Container, SubTitleText } from './EmptyItem.style'

interface EmptyItemProps {
  textKey: string
}

/**
 *
 */
const EmptyItem = ({ textKey: text }: EmptyItemProps) => {
  return (
    <Container>
      <Image
        style={{ width: 216, height: 189 }}
        source={defaultImages.emptyItem}
      />
      <SubTitleText>{i18n.t(text)}</SubTitleText>
    </Container>
  )
}

export default EmptyItem
