import React from 'react'

import { Text, TouchableOpacity } from 'react-native'

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
      {/* TODO: Icon 연결 */}
      <TouchableOpacity onPress={onClose}>
        <Text>close</Text>
      </TouchableOpacity>
    </Container>
  )
}
