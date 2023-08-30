import React from 'react'

import XMark from '@/assets/icons/x-mark.svg'
import { colors } from '@/styles/colors'

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
        <XMark color={colors.gray600} />
      </CloseButton>
    </Container>
  )
}
