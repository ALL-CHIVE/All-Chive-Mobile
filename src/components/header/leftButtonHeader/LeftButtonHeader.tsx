import React from 'react'

import { Image, View } from 'react-native'

import { defaultIcons } from '@/assets'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, HeaderLeft, Title } from './LeftButtonHeader.style'

interface LeftButtonHeaderProps {
  navigation: MainNavigationProp
  title: string
}

/**
 * LeftButtonHeader
 */
export const LeftButtonHeader = ({ navigation, title }: LeftButtonHeaderProps) => {
  return (
    <Container>
      <HeaderLeft onPress={navigation.goBack}>
        {/* TODO: Icon 연결 */}
        <Image source={defaultIcons.back} />
      </HeaderLeft>
      <Title>{title}</Title>
      <View style={{ flex: 1 }}></View>
    </Container>
  )
}
