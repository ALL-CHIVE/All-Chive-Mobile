import React from 'react'

import { Text, TouchableOpacity } from 'react-native'

import { Container } from './GrayTag.style'

interface GrayTagProps {
  tag: string
  onRemove?: () => void
}

/**
 * GrayTag Components
 */
export const GrayTag = ({ tag, onRemove }: GrayTagProps) => {
  return (
    <>
      <Container>
        <Text>{tag}</Text>
        <TouchableOpacity onPress={onRemove}>
          <Text>X</Text>
        </TouchableOpacity>
      </Container>
    </>
  )
}
