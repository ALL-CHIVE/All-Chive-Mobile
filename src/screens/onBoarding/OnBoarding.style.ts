import styled from '@emotion/native'

import { fonts } from '@/styles/fonts'

export const Container = styled.SafeAreaView`
  height: 100%;
  align-items: center;
  padding: 0 25px;
`

export const OnBoardingImage = styled.Image`
  margin-top: 30%;
`

export const Title = styled.Text`
  ${fonts.heading2}
  text-align: center;
  margin: 6% 0;
`
