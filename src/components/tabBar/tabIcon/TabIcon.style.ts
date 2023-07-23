import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  width: 61px;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const BottomTabImage = styled.Image``

export const Title = styled.Text`
  ${fonts.body3}
  color: ${colors.gray600}
`
