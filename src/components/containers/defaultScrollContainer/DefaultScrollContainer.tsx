import React from 'react'

import { Bottom, Container } from './DefaultScrollContainer.style'

interface DefaultScrollContainerProps {
  children: React.ReactNode
}

/**
 * DefaultScrollContainer
 */
const DefaultScrollContainer = ({ children }: DefaultScrollContainerProps) => {
  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
      <Bottom />
    </Container>
  )
}

export default DefaultScrollContainer
