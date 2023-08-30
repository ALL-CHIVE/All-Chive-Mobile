import React from 'react'

import { useNavigation } from '@react-navigation/native'

import LeftArrowIcon from '@/assets/icons/left-arrow.svg'
import PopupIcon from '@/assets/icons/popup.svg'
import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, HeaderLeft, HeaderRight, RightButton, Title } from './DefaultHeader.style'

interface DefaultHeaderProps {
  title: string | undefined
  PopupMenuList: PopupMenu[] | undefined
  onRightClick?: () => void
  navigate?: () => void
}

/**
 * DefaultHeader (navigate 값이 존재한다면 해당 값으로, 없다면 뒤로가기)
 */
const DefaultHeader = ({ title, PopupMenuList, onRightClick, navigate }: DefaultHeaderProps) => {
  const navigation = useNavigation<MainNavigationProp>()

  /**
   * 어디로 이동할지 핸들링합니다. (ContentDetail에 다른 Flow가 있어서 분기처리)
   */
  const handleNavigation = () => {
    if (navigate) {
      navigate()
    } else {
      navigation.goBack()
    }
  }

  return (
    <Container>
      <HeaderLeft onPress={handleNavigation}>
        <LeftArrowIcon />
      </HeaderLeft>
      <Title numberOfLines={1}>{title}</Title>
      <HeaderRight>
        {PopupMenuList ? (
          <Popup menuList={PopupMenuList} />
        ) : (
          <RightButton onPress={onRightClick}>
            <PopupIcon />
          </RightButton>
        )}
      </HeaderRight>
    </Container>
  )
}

export default DefaultHeader
