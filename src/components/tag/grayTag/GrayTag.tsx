import React from 'react'

import { TouchableOpacity } from 'react-native'

import { Container, RowView, Text } from './GrayTag.style'

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
        <RowView>
          <Text>{tag}</Text>
          <TouchableOpacity onPress={onRemove}>
            <Text>{`  x`}</Text>
          </TouchableOpacity>
        </RowView>
      </Container>
    </>
  )
}
