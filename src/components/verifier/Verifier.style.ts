import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Text = styled.Text`
  ${fonts.body4}
  color: ${colors.gray600};
`

export const Blank = styled.View``
