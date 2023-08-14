import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, View } from 'react-native'

import { defaultIcons } from '@/assets'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import {
  Container,
  HeaderLeft,
  RightButton,
  RightButtonText,
  Title,
} from './LeftButtonHeader.style'

interface LeftButtonHeaderProps {
  title: string
  rightButtonText?: string
  rightButtonClick?: () => void
}

/**
 * LeftButtonHeader
 */
export const LeftButtonHeader = ({
  title,
  rightButtonText,
  rightButtonClick,
}: LeftButtonHeaderProps) => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <Container>
      <HeaderLeft onPress={navigation.goBack}>
        <Image source={defaultIcons.back} />
      </HeaderLeft>
      <Title>{title}</Title>
      {rightButtonText ? (
        <RightButton onPress={rightButtonClick}>
          <RightButtonText>{rightButtonText}</RightButtonText>
        </RightButton>
      ) : (
        <View style={{ width: 30 }} />
      )}
    </Container>
  )
}
