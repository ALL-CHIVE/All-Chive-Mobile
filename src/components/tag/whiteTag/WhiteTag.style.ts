import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'

export const TagContainer = styled.View`
  background-color: ${colors.white};
  padding: 10px;
  border-radius: 7px;
  margin-top: 10px;
  margin-right: 7px;
`

export const Styles = {
  Gray: css`
    color: ${colors.gray300};
  `,
  Black: css`
    color: ${colors.gray400};
  `,
}
