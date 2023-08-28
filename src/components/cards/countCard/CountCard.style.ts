import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Title = styled.Text`
  ${fonts.body3}
  color: ${colors.gray400};
`

export const Count = styled.Text`
  ${fonts.subtitle1}
  color: ${colors.gray600};
`

export const Styles = {
  container: css`
    height: 62px;
    width: 95px;
    border-radius: 8px;
    margin: 0 10px;
    padding: 12px;
  `,
}
