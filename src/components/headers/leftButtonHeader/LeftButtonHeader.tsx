import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, View } from 'react-native'

import { defaultIcons } from '@/assets'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, HeaderLeft, Title } from './LeftButtonHeader.style'

interface LeftButtonHeaderProps {
  title: string
}

/**
 * LeftButtonHeader
 */
export const LeftButtonHeader = ({ title }: LeftButtonHeaderProps) => {
  const navigation = useNavigation<MainNavigationProp>()

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
