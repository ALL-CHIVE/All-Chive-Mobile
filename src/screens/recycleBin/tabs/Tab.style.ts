import styled, { css } from '@emotion/native'
import { FlatList } from 'react-native'

import { ContentCardInfo } from '@/models/ContentCard'
import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  background-color: ${colors.white};
  height: 100%;
`

export const TabItemContainer = styled.View`
  margin-bottom: 40px;
  padding: 0px 25px;
`

export const Header = styled.View`
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

export const TabItemCardContainer = styled.View`
  align-items: center;
  margin-top: 18px;
`

export const GrayDivider = styled.View`
  width: 100%;
  height: 11px;
  background-color: ${colors.gray50};
`

export const ContentListContainer = styled(FlatList<ContentCardInfo>)`
  width: 336px;
`

export const CheckBox = styled.View`
  position: absolute;
  width: 14px;
  height: 14px;
  top: 15px;
  left: 14px;
  border: 1px solid ${colors.gray500};
  background-color: ${colors.white};
`

export const Styles = {
  checkIcon: css`
    position: absolute;
    top: 9px;
    left: 12px;
  `,
}
