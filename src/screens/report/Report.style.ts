import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  padding: 20px 25px;
`

export const Title = styled.Text`
  ${fonts.subtitle1}
  color: ${colors.mainBlack};
`

export const Menu = styled.View`
  margin-top: 20px;
  margin-bottom: 30px;
`
