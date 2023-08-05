import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  padding: 0 25px;
`

export const Title = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.mainBlack};
  text-align: center;
`

export const LatestTitle = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
  margin-bottom: 13px;
`

export const PlusTagButton = styled.TouchableOpacity`
  width: 215px;
  height: 50px;
  border-radius: 40px;
  background-color: ${colors.mainYellow};
  justify-content: center;
  align-items: center;
  padding: 13px;
  margin: 0 auto;
  margin-top: 26px;
  flex-direction: row;
`

export const PlusTagText = styled.Text`
  ${fonts.btn1}
  color: ${colors.gray400};
  margin-left: 10px;
`

export const RowView = styled.View`
  flex-direction: row;
`
