import React from 'react'

import { Container, Text } from './BigWhiteTag.style'

interface BigWhiteTagProps {
  tag: string
}

/**
 * BigWhiteTag Components
 */
export const BigWhiteTag = ({ tag }: BigWhiteTagProps) => {
  return (
    <Container>
      <Text>{tag}</Text>
    </Container>
  )
}
