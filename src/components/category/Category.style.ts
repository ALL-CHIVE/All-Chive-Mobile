import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const CategoryContainer = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  height: 29px;
  border-radius: 6px;
  padding: 4px 15px;
`

export const CategoryStyles = {
  default: css`
    background-color: ${colors.yellow200};
    color: ${colors.gray300};
  `,
  click: css`
    background-color: ${colors.mainYellow};
    color: ${colors.gray500};
  `,
}

export const CategoryText = styled.Text`
  font-family: ${fonts.body2};
`
