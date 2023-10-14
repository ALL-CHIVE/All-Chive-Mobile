import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'

export const CheckBox = styled.View`
  width: 18px;
  height: 18px;
  border: 1px solid ${colors.gray100};
  background-color: ${colors.white};
`

export const Styles = {
  checked: css`
    background-color: ${colors.yellow500};
    border: 1px solid ${colors.gray500};
  `,
}
