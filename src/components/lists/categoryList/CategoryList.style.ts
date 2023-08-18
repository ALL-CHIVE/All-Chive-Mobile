import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ScrollContainer = styled.ScrollView`
  flex-direction: row;
  background-color: rgba(255, 252, 231, 0.9);
  padding-left: 25px;
`

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 4px 15px;
  background-color: ${colors.yellow200};
  margin-right: 11px;
`

export const ClickStyles = {
  category: css`
    background-color: ${colors.mainYellow};
  `,
  text: css`
    color: ${colors.gray500};
  `,
}

export const Text = styled.Text`
  ${fonts.body2};
  color: ${colors.gray300};
`
