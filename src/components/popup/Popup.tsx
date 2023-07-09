import React from 'react'

import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu'

import i18n from '@/locales'
import { PopupMenu } from '@/models/PopupMenu'

interface PopupProps {
  icon: string
  menuList: PopupMenu[]
}

/**
 * Popup
 */
const Popup = ({ icon, menuList }: PopupProps) => {
  return (
    <Menu>
      {/* TODO: 아이콘 연결 */}
      <MenuTrigger text="팝업" />
      <MenuOptions
        optionsContainerStyle={{
          marginTop: 20,
          width: 80,
          shadowOpacity: 0,
        }}
      >
        {menuList?.map((menu) => (
          <MenuOption
            key={menu.title}
            onSelect={menu.onClick}
            text={i18n.t(menu.title)}
          />
        ))}
      </MenuOptions>
    </Menu>
  )
}

export default Popup
