import React from 'react'

import { Image } from 'react-native'

import { defaultIcons } from '@/assets'

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
          <Image source={defaultIcons.grayCloseButton} />
        </CloseButton>
      </Container>
    </Header>
  )
}

export default ImageHeader
