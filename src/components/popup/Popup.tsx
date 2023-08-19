import React from 'react'

import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu'

import PopupIcon from '@/assets/icons/popup.svg'
import i18n from '@/locales'
import { PopupMenu } from '@/models/PopupMenu'

import { Container, Title } from './Popup.style'
interface PopupProps {
  menuList: PopupMenu[]
}

/**
 * Popup
 */
const Popup = ({ menuList }: PopupProps) => {
  return (
    <Menu>
      <MenuTrigger>
        <Container>
          <PopupIcon />
        </Container>
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={{
          marginTop: 20,
          shadowOpacity: 0,
          borderRadius: 4,
          width: 'auto',
          padding: 4,
        }}
      >
        {menuList?.map((menu) => (
          <MenuOption
            style={{ padding: 6 }}
            key={menu.title}
            onSelect={menu.onClick}
          >
            <Title>{i18n.t(menu.title)}</Title>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  )
}

export default Popup
