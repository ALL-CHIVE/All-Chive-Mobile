import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  height: 250px;
`

export const ProfileContainer = styled.View`
  display: flex;
  flex-direction: column;
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
  color: ${colors.gray600};
`

export const ProfileImage = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 40px;
`

export const NicknameText = styled.Text`
  ${fonts.title2}
  margin-top: 7px;
  color: ${colors.gray600};
`

export const NavigationListContainer = styled.View`
  display: flex;
  width: 100%;
  padding: 30px 24px 0px 24px;
`

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 107px;
  background-color: ${colors.yellow100};
`

export const FooterText = styled.Text`
  ${fonts.body3}
  color: ${colors.gray300};
`
