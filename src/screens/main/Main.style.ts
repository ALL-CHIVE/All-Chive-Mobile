import styled, { css } from '@emotion/native'
import { FlatList } from 'react-native'

import { ArchivingInfo } from '@/models/Archiving'
import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 46px;
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
  border-radius: 40px;
`

export const ScrollContainer = styled.ScrollView``

export const Container = styled.View`
  align-items: center;
`

export const Greeding = styled.View`
  margin-bottom: 127px;
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
  width: 238.334px;
  height: 231.344px;
  right: -10.33px;
  top: 5px;
`

export const ArchivingCardList = styled(FlatList<ArchivingInfo>)`
  margin-top: -10px;
`

export const List = styled.View`
  align-items: center;
`

export const Styles = {
  flatList: css`
    margin-top: 9px;
    flex: 1;
  `,
}

export const Blank = styled.View`
  height: 400px;
`
