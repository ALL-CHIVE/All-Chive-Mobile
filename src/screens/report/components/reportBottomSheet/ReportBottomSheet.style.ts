import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  background-color: ${colors.white};
  height: 380px;
  border-radius: 20px 20px 0px 0px;
  align-items: center;
  padding: 10% 0;
`

export const Title = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
  text-align: center;
  margin-bottom: 25px;
`
