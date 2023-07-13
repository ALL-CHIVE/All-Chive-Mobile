import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 519px;
  bottom: -80px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 20px;
`

export const Title = styled.Text`
  ${fonts.title2}
  color: ${colors.mainBlack};
`
