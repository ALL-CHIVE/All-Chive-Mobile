import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const CategoryContainer = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  height: 29px;
  border-radius: 6px;
  padding: 4px 15px;
  background-color: ${colors.yellow200};
`

export const CategoryStyles = {
  click: css`
    color: ${colors.gray500};
  `,
}

export const CategoryText = styled.Text`
  ${fonts.body2};
  color: ${colors.gray300};
`
