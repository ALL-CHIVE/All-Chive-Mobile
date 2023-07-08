import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.SafeAreaView`
  height: 100%;
  margin: 0 6%;
`

export const Heading = styled.Text`
  ${fonts.heading2};
  margin-top: 20%;
`

export const SelectButton = styled.View`
  margin: 20% 0;
`

export const BodyText = styled.Text`
  ${fonts.body1}
  margin-top: 5%;
`
