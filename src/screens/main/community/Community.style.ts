import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const BackgroundImage = styled.Image`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 147.17px;
  height: 162.52px;
`

export const PopularContainer = styled.ScrollView`
  flex-direction: row;
  margin-top: 80px;
`

export const Menu = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: ${colors.gray50};
  flex-direction: row;
  padding: 0 18.5px;
  margin-bottom: 16px;
`

export const MenuButton = styled.TouchableOpacity`
  padding: 9px 18.5px;
`

export const MenuText = styled.Text`
  ${fonts.subtitle1}
  color: ${colors.gray500};
`

export const SelectedStyle = {
  menuText: css`
    color: ${colors.yellow500};
  `,
  menuButton: css`
    border-bottom-width: 4px;
    border-bottom-color: ${colors.yellow500};
  `,
}
