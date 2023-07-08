import styled from '@emotion/native'

import { fonts } from '@/styles/fonts'

export const Container = styled.SafeAreaView`
  height: 100%;
  margin: 0 6%;
  align-items: center;
`

export const OnBoardingImage = styled.Image`
  margin-top: 30%;
`

export const Title = styled.Text`
  ${fonts.heading2}
  text-align: center;
  margin: 6% 0;
`
