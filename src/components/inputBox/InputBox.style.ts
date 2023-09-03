import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const TextBox = styled.TextInput`
  width: 325px;
  border-radius: 6px;
  border-width: 1px;
  padding: 10px;
  padding-bottom: 24px;
  color: ${colors.gray600};
`

export const TextCounter = styled.Text`
  position: absolute;
  bottom: 10px;
  right: 10px;
  ${fonts.body3}
  color: ${colors.gray300}
`
