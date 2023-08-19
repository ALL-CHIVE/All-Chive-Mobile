import React from 'react'

import i18n from '@/locales'

import { Container, Title } from './TabIcon.style'

interface TabIconProps {
  children: React.ReactNode
  text: string
}

/**
 * TabIcon
 */
const TabIcon = ({ children, text }: TabIconProps) => {
  return (
    <Container>
      {children}
      <Title>{i18n.t(text)}</Title>
    </Container>
  )
}

export default TabIcon
