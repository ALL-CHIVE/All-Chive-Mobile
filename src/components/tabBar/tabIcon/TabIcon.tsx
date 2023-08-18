import React from 'react'

import { ImageSourcePropType } from 'react-native'

import i18n from '@/locales'

import { BottomTabImage, Container, Title } from './TabIcon.style'

interface TabIconProps {
  icon: ImageSourcePropType
  text: string
}

/**
 * TabIcon
 */
const TabIcon = ({ icon, text }: TabIconProps) => {
  return (
    <Container>
      <BottomTabImage
        source={icon}
        resizeMode="contain"
      />
      <Title>{i18n.t(text)}</Title>
    </Container>
  )
}

export default TabIcon
