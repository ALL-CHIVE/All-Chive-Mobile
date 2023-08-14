import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  background-color: ${colors.yellow100};
  padding: 20px 25px;
  margin-bottom: 12px;
`

export const CategoryContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

export const CategoryCount = styled.Text`
  color: ${colors.mainBlack};
  ${fonts.subtitle2}
  margin-left: 8px;
`

export const CategoryBox = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 25px;
  background-color: ${colors.mainYellow};
  padding: 0px 15px;
`

export const CategoryText = styled.Text`
  ${fonts.body2}
  color: ${colors.gray500};
`

export const ArchivingContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 5px 0px 5px;
`

export const MainBlackText = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.mainBlack};
`

export const GrayText = styled.Text`
  ${fonts.body1}
  color: ${colors.gray500};
`
