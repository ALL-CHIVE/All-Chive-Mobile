import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  background-color: ${colors.gray300};
  border-radius: 20px;
  padding: 4px 15px;
  margin-right: 8px;
`

export const Text = styled.Text`
  ${fonts.body2}
  color: ${colors.white};
`

export const RowView = styled.View`
  flex-direction: row;
`
