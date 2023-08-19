import React from 'react'

import XMark from '@/assets/icons/x_mark.svg'

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
          <XMark />
        </CloseButton>
      </Container>
    </Header>
  )
}

export default ImageHeader
