import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, TouchableOpacity, View } from 'react-native'

import { defaultIcons } from '@/assets'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, HeaderLeft, RightButtonText, Title } from './LeftButtonHeader.style'

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
      <View style={{ flex: 1 }}></View>
      {rightButtonText && (
        <TouchableOpacity onPress={rightButtonClick}>
          <RightButtonText>{rightButtonText}</RightButtonText>
        </TouchableOpacity>
      )}
    </Container>
  )
}
