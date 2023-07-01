import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'

/**
 *
 */

export const BoxButtonContainer = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  width: 325px;
  height: 56px;
  border-radius: 8px;
`

export const BoxButtonStyles = {
  default: css`
    background-color: ${colors.mainYellow};
    color: ${colors.gray500};
  `,
  disabled: css`
    background-color: ${colors.gray50};
    color: ${colors.gray300};
  `,
  hover: css`
    background-color: ${colors.yellow500};
    color: ${colors.gray500};
  `,
}
