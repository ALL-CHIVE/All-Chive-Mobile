import React from 'react'

import { Text } from 'react-native'

import { CloseButton, Container, Title } from './ImageHeader.style'

interface ImageHeaderProps {
  title: string
  onClose: () => unknown
}

/**
 *
 */
const ImageHeader = ({ title, onClose }: ImageHeaderProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <CloseButton onPress={onClose}>
        {/* TODO: link close icon */}
        <Text>close</Text>
      </CloseButton>
    </Container>
  )
}

export default ImageHeader
