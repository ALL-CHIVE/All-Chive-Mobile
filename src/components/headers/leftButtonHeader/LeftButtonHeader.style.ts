import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  height: 100px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${colors.white};
  padding: 0px 25px;
`

export const HeaderLeft = styled.TouchableOpacity`
  width: 30px;
`

export const Title = styled.Text`
  ${fonts.title2}
  flex: 1;
  text-align: center;
  color: ${colors.mainBlack};
`
export const RightButton = styled.TouchableOpacity`
  width: 30px;
`

export const RightButtonText = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray500};
`
