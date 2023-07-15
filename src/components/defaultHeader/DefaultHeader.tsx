import React from 'react'

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Text } from 'react-native'

import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, HeaderLeft, HeaderRight, Title } from './DefaultHeader.style'

interface DefaultHeaderProps {
  navigation: MainNavigationProp
  title: string
  PopupMenuList: PopupMenu[]
  options: NativeStackNavigationOptions | BottomTabNavigationOptions
}

/**
 * DefaultHeader
 */
const DefaultHeader = ({ navigation, title, PopupMenuList }: DefaultHeaderProps) => {
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
