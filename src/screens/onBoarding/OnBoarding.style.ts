import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  align-items: center;
  padding-top: 130px;
`

export const OnBoardingImage = styled.Image`
  margin-bottom: 31px;
`

export const Title = styled.Text`
  ${fonts.heading2};
  text-align: center;
  color: ${colors.mainBlack};
  margin-bottom: 31px;
`
