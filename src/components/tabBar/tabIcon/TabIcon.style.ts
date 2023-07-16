import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`

export const BottomTabImage = styled.Image`
  width: 20px;
  height: 20px;
`

export const Title = styled.Text`
  ${fonts.body3}
  color: ${colors.gray500}
`
