import React from 'react'

import { Text, TouchableOpacity } from 'react-native'

import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, Title } from './CloseButtonHeader.style'

interface CloseButtonHeaderProps {
  navigation: MainNavigationProp
  title: string
}

/**
 * CloseButtonHeader
 */
export const CloseButtonHeader = ({ navigation, title }: CloseButtonHeaderProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      {/* TODO: Icon 연결 */}
      <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
        <Text>close</Text>
      </TouchableOpacity>
    </Container>
  )
}
