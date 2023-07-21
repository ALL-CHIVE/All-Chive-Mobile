import React from 'react'

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Text } from 'react-native'

import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, HeaderLeft, HeaderRight, Title } from './DefaultHeader.style'

interface DefaultHeaderProps {
  title: string | undefined
  PopupMenuList: PopupMenu[]
  options: NativeStackNavigationOptions | BottomTabNavigationOptions
}

/**
 * DefaultHeader
 */
const DefaultHeader = ({ title, PopupMenuList }: DefaultHeaderProps) => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <Container>
      <HeaderLeft onPress={navigation.goBack}>
        {/* TODO: Icon 연결 */}
        <Text>back</Text>
      </HeaderLeft>
      <Title numberOfLines={1}>{title}</Title>
      <HeaderRight>
        <Popup
          icon=""
          menuList={PopupMenuList}
        />
      </HeaderRight>
    </Container>
  )
}

export default DefaultHeader
