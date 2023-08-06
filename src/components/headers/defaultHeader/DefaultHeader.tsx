import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'

import { defaultIcons } from '@/assets'
import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, HeaderLeft, HeaderRight, Title } from './DefaultHeader.style'

interface DefaultHeaderProps {
  title: string | undefined
  PopupMenuList: PopupMenu[]
}

/**
 * DefaultHeader
 */
const DefaultHeader = ({ title, PopupMenuList }: DefaultHeaderProps) => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <Container>
      <HeaderLeft onPress={navigation.goBack}>
        <Image source={defaultIcons.back} />
      </HeaderLeft>
      <Title numberOfLines={1}>{title}</Title>
      <HeaderRight>
        <Popup menuList={PopupMenuList} />
      </HeaderRight>
    </Container>
  )
}

export default DefaultHeader
