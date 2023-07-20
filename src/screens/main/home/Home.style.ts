import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 56px;
  margin-bottom: 25px;
  padding: 0 25px;
`

export const SearchContainer = styled.View`
  flex: 1;
`

export const ProfileImage = styled.Image`
  margin-left: 12px;
  width: 41px;
  height: 41px;
`

export const ScrollContainer = styled.ScrollView``

export const Container = styled.View`
  align-items: center;
`

export const Greeding = styled.View`
  margin-bottom: 141px;
  margin-left: 25px;
`

export const NicknameText = styled.Text`
  ${fonts.subtitle1};
  color: ${colors.gray600};
`

export const Title = styled.Text`
  ${fonts.heading2};
  color: ${colors.gray600};
`

export const BackgroundImage = styled.Image`
  position: absolute;
  right: 0px;
  top: 38px;
`

export const ArchivingListContainer = styled.View`
  margin-top: 16px;
  align-items: center;
`
export const Blank = styled.View`
  height: 400px;
`
