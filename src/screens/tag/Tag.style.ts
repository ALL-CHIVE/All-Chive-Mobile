import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.mainBlack};
  text-align: center;
`
