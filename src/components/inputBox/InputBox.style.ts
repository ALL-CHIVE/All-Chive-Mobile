import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const TextBox = styled.TextInput`
  width: 325px;
  height: 117px;
  border-radius: 10px;
  border-width: 1px;
  padding: 10px;
`

export const TextCounter = styled.Text`
  position: absolute;
  bottom: 10px;
  right: 10px;
  ${fonts.body3}
  color: ${colors.gray300}
`
