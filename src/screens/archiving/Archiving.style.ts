import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ArchivingContainer = styled.View`
  padding: 0 25px;
`

export const NicknameText = styled.Text`
  ${fonts.subtitle1};
  color: ${colors.gray600};
`

export const TitleText = styled.Text`
  ${fonts.heading2};
  color: ${colors.gray600};
`
