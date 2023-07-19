import React from 'react'

import { Container, Text } from './WhiteTag.style'

interface WhiteTagProps {
  tag: string
}

/**
 * WhiteTag Components
 */
export const WhiteTag = ({ tag }: WhiteTagProps) => {
  return (
    <>
      <Container>
        <Text>{tag}</Text>
      </Container>
    </>
  )
}
