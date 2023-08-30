import React from 'react'

import { BlurView } from '@react-native-community/blur'
import { View } from 'react-native'
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu'

import PopupIcon from '@/assets/icons/popup.svg'
import i18n from '@/locales'
import { PopupMenu } from '@/models/PopupMenu'

import { Container, Divider, Styles, Title } from './Popup.style'
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
      <MenuOptions optionsContainerStyle={{ ...Styles.container, shadowOpacity: 0 }}>
        <BlurView
          style={Styles.background}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
          overlayColor="transparent"
          blurRadius={20}
        />
        {menuList?.map((menu, idx) => (
          <View
            key={menu.title}
            style={{ alignItems: 'center' }}
          >
            <MenuOption
              style={[
                Styles.menuOption,
                idx < menuList.length - 1 && { marginBottom: -5 },
                idx > 0 && { marginTop: -3 },
              ]}
              onSelect={menu.onClick}
            >
              <Title>{i18n.t(menu.title)}</Title>
            </MenuOption>
            {idx < menuList.length - 1 && <Divider />}
          </View>
        ))}
      </MenuOptions>
    </Menu>
  )
}

export default Popup
