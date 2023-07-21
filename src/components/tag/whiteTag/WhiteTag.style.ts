import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  background-color: ${colors.white};
  border-radius: 20px;
  padding: 1px 8px;
  margin-right: 8px;
  border: 1px solid ${colors.gray400};
`

export const Text = styled.Text`
  ${fonts.body2}
  color: ${colors.gray400};
`
