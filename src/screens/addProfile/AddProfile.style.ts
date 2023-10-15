import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  padding: 0 25px;
`

export const Heading = styled.Text`
  ${fonts.heading2};
  color: ${colors.mainBlack};
  margin-top: 80px;
`

export const NicknameContainer = styled.View`
  margin-top: 47px;
  margin-bottom: 59px;
`

export const NicknameInputBox = styled.View`
  border-bottom-color: ${colors.gray600};
  border-bottom-width: 1px;
  justify-content: space-between;
  margin-bottom: 14px;
  flex: 1;
`

export const BodyText = styled.Text`
  ${fonts.body1}
  color: ${colors.gray600};
`
