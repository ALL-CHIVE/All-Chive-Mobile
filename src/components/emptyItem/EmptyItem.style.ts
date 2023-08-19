import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  align-items: center;
`

export const SubTitleText = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
  margin-top: 11px;
`
