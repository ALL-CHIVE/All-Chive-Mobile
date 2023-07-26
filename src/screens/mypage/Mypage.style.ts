import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  height: 392px;
`

export const ProfileContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const HeaderContainer = styled.View`
  flex-direction: row;
  padding: 24px;
`

export const Title = styled.Text`
  ${fonts.title2}
  flex: 1;
  text-align: center;
  color: ${colors.mainBlack};
`

export const NavigationListContainer = styled.View`
  display: flex;
  width: 100%;
  padding: 36px 25px;
`

export const Footer = styled.View`
  display: flex;
  width: 100%;
  color: ${colors.yellow100};
`
