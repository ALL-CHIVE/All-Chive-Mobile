import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  padding: 12px 8px;
`

export const Title = styled.Text`
  ${fonts.body3}
  color: ${colors.mainBlack};
`

export const Styles = {
  menuOption: css`
    align-items: center;
  `,
}
