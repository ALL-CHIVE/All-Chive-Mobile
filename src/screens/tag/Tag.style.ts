import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  height: 100%;
  padding: 0 25px;
`

export const Title = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.mainBlack};
  text-align: center;
`

export const PlusTagButton = styled.TouchableOpacity`
  width: 215px;
  height: 50px;
  border-radius: 40px;
  background-color: ${colors.mainYellow};
  justify-content: center;
  align-items: center;
  padding: 13px 136px 13px 136px;
  margin: 0 auto;
  margin-top: 26px;
`

export const PlusTagText = styled.Text`
  ${fonts.btn1}
  color: ${colors.gray400};
`