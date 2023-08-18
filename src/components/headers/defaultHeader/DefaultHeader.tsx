import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'

import { defaultIcons } from '@/assets'
import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, HeaderLeft, HeaderRight, RightButton, Title } from './DefaultHeader.style'

interface DefaultHeaderProps {
  title: string | undefined
  PopupMenuList: PopupMenu[] | undefined
  onRightClick?: () => void
}

/**
 * DefaultHeader
 */
const DefaultHeader = ({ title, PopupMenuList, onRightClick }: DefaultHeaderProps) => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <Container>
      <HeaderLeft onPress={navigation.goBack}>
        <Image source={defaultIcons.back} />
      </HeaderLeft>
      <Title numberOfLines={1}>{title}</Title>
      <HeaderRight>
        {PopupMenuList ? (
          <Popup menuList={PopupMenuList} />
        ) : (
          <RightButton onPress={onRightClick}>
            <Image source={defaultIcons.popup} />
          </RightButton>
        )}
      </HeaderRight>
    </Container>
  )
}

export default DefaultHeader
