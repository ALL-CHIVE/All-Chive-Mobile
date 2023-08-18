import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
`

export const Description = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray400};
`

export const Title = styled.Text`
  ${fonts.title2}
  color: ${colors.mainBlack}
`
