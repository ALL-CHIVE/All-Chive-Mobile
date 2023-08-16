import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ScrollContainer = styled.ScrollView`
  height: 100%;
  background-color: ${colors.yellow200};
`

export const TabItemContainer = styled.View`
  padding: 0px 25px;
  align-items: center;
  margin-bottom: 44px;
`

export const TabHeader = styled.View`
  width: 100%;
`

export const SearchDataText = styled.Text`
  ${fonts.body2}
  color: ${colors.gray300};
  margin-top: 20px;
  margin-bottom: 3px;
`

export const Title = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
`

export const TabArchivingCardContainer = styled.View`
  align-items: center;
  margin-top: 18px;
`

export const WhiteDivider = styled.View`
  width: 100%;
  height: 11px;
  background-color: ${colors.white};
`

export const Bottom = styled.View`
  padding-bottom: 300px;
`
