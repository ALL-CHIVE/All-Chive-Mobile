import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  background-color: ${colors.white};
  padding: 10px;
  border-radius: 7px;
  margin-top: 10px;
  margin-right: 7px;
`

export const Text = styled.Text`
  ${fonts.body2}
  color: ${colors.gray400};
`
