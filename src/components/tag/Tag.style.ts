import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'

export const WhiteTagContainer = styled.View`
  background-color: ${colors.white};
  padding: 10px;
  border-radius: 7px;
  margin-top: 10px;
  margin-right: 7px;
`

export const Styles = {
  White: css`
    color: ${colors.white};
  `,
  Gray: css`
    color: ${colors.gray400};
  `,
}

export const GrayTagContainer = styled.View`
  background-color: ${colors.gray300};
  padding: 10px;
  border-radius: 7px;
  margin-top: 10px;
  margin-right: 7px;
`
