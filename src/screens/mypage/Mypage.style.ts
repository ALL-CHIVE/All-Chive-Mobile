import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ScrollContainer = styled.ScrollView`
  width: 375px;
`

export const MyPageContainer = styled.View`
  height: 270px;
  border-radius: 0px 0px 20px 20px;
  overflow: hidden;
`

export const HeaderContainer = styled.View`
  flex-direction: row;
  padding: 25px;
`

export const ProfileContainer = styled.View`
  margin-top: 6px;
  align-items: center;
  justify-content: center;
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
