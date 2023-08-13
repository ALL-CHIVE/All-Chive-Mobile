import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ScrollContainer = styled.ScrollView`
  width: 100%;
`

export const PlusButton = styled.TouchableOpacity`
  width: 100px;
  height: 28px;
  padding: 5px 10px;
  border-radius: 30px;
  margin: 0 auto;
  background-color: ${colors.yellow200};
`

export const PlusButtonText = styled.Text`
  ${fonts.body4}
  color: ${colors.gray500};
  text-align: center;
`

export const WhiteDivider = styled.View`
  width: 100%;
  height: 12px;
  background-color: ${colors.white};
`

export const Bottom = styled.View`
  padding-bottom: 150px;
`
