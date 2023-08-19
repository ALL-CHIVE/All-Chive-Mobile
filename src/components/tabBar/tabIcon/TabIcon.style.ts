import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  position: absolute;
  width: 61px;
  top: 0px;
  height: 70px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  ${fonts.body3}
  color: ${colors.gray600}
`
