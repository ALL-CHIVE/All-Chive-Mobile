import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const MemoContainer = styled.View`
  background-color: ${colors.white};
  border-width: 1px;
  border-color: ${colors.gray200};
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
`

export const MemoText = styled.Text`
  ${fonts.body3}
  color: ${colors.gray500};
  margin-bottom: 20px;
`

export const TextCounter = styled.Text`
  position: absolute;
  bottom: 10px;
  right: 10px;
  ${fonts.body3}
  color: ${colors.gray300}
`
