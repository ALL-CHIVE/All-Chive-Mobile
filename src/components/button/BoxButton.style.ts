import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const BoxButtonContainer = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background-color: ${colors.mainYellow};
  position: absolute;
  bottom: 34px;
  left: 25px;
  right: 25px;
`

export const BoxButtonStyles = {
  disabled: css`
    background-color: ${colors.gray50};
    color: ${colors.gray300};
  `,
}

export const BoxButtonText = styled.Text`
  ${fonts.btn1};
  color: ${colors.gray500};
`
