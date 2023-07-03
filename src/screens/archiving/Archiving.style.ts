import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ArchivingContainer = styled.View`
  padding: 0 25px;
`

export const NicknameText = styled.Text`
  font-family: ${fonts.subtitle1};
  color: ${colors.gray600};
`

export const TitleText = styled.Text`
  font-family: ${fonts.heading2};
  color: ${colors.gray600};
  white-space: pre-line;
`
