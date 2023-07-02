import React from 'react'

import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu'

import { PopupMenu } from '@/models/PopupMenu'

interface HeaderRightProps {
  icon: string
  menuList: PopupMenu[]
}

/**
 * HeaderRight
 */
const HeaderRightWithPopup = ({ icon, menuList }: HeaderRightProps) => {
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
            text={menu.title}
          />
        ))}
      </MenuOptions>
    </Menu>
  )
}

export default HeaderRightWithPopup
