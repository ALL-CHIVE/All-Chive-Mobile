import React from 'react'

import { Container, Text } from './ClickableTag.style'

interface TagProps {
  tag: string
  onClick?: () => void
}

/**
 * WhiteTag Components
 */
export const ClickableTag = ({ tag, onClick }: TagProps) => {
  return (
    <Container onPress={onClick}>
      <Text>{tag}</Text>
    </Container>
  )
}
