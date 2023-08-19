import React from 'react'

import XMark from '@/assets/icons/x_mark.svg'

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
        <XMark />
      </CloseButton>
    </Container>
  )
}
