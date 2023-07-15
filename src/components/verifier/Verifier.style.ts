import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  flex-direction: row;
`

export const Text = styled.Text`
  ${fonts.body4}
  color: ${colors.gray600};
`
