import React from 'react'

import { Container } from './DefaultContainer.style'

interface DefaultContainerProps {
  children: React.ReactNode
}

/**
 * DefaultContainer
 */
const DefaultContainer = ({ children }: DefaultContainerProps) => {
  return <Container>{children}</Container>
}

export default DefaultContainer
