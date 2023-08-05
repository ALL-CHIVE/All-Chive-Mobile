import styled from '@emotion/native'
import { FlatList } from 'react-native'

import { SimpleContent } from '@/models/SimpleContent'
import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  display: flex;
  height: 100%;
  background-color: ${colors.white};
`

export const TabContainer = styled.View`
  flex-direction: row;
  display: flex;
  height: 100%;
  align-items: center;
`

export const TabItemContainer = styled.View`
  display: flex;
  padding: 0px 25px;
  margin-bottom: 40px;
`

export const TabItemCardContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 18px;
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

export const GrayDivider = styled.View`
  width: 100%;
  height: 11px;
  background-color: ${colors.gray50};
`

export const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`

export const SubTitleText = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
  margin-top: 23px;
`

export const ContentListContainer = styled(FlatList<SimpleContent>)`
  margin: auto;
  flex-direction: row;
`

export const CheckBox = styled.TouchableOpacity`
  position: absolute;
  width: 14px;
  height: 14px;
  top: 15px;
  left: 14px;
  border: 1px solid ${colors.gray500};
  background-color: ${colors.white};
`

export const YellowCheck = styled.TouchableOpacity`
  position: absolute;
  top: 13px;
  left: 14px;
`
