import React from 'react'

import { TouchableOpacity, Image } from 'react-native'

import { defaultIcons } from '@/assets'

import { Container, Title } from './CloseButtonHeader.style'

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
      <TouchableOpacity onPress={onClose}>
        <Image source={defaultIcons.xButton} />
      </TouchableOpacity>
    </Container>
  )
}
