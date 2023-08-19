import React from 'react'

import XMark from '@/assets/icons/x_mark.svg'
import { colors } from '@/styles/colors'

import { CloseButton, Container, Header, Title } from './ImageHeader.style'

interface ImageHeaderProps {
  title: string
  onClose: () => unknown
}

/**
 *
 */
const ImageHeader = ({ title, onClose }: ImageHeaderProps) => {
  return (
    <Header>
      <Container>
        <Title>{title}</Title>
        <CloseButton onPress={onClose}>
          <XMark color={colors.gray600} />
        </CloseButton>
      </Container>
    </Header>
  )
}

export default ImageHeader
