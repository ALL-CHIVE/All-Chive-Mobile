import React from 'react'

import { Image } from 'react-native'

import { defaultIcons } from '@/assets'

import { CloseButton, Container, Title } from './CloseButtonHeader.style'

interface CloseButtonHeaderProps {
  title: string
  onClose: () => void
}

/**
 * CloseButtonHeader
 */
export const CloseButtonHeader = ({ title, onClose }: CloseButtonHeaderProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <CloseButton onPress={onClose}>
        <Image source={defaultIcons.grayCloseButton} />
      </CloseButton>
    </Container>
  )
}
