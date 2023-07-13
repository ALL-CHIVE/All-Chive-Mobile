import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  margin-bottom: 20%;
`

export const Button = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background-color: ${colors.mainYellow};
`

export const DisabledStyles = {
  button: css`
    background-color: ${colors.gray50};
  `,
  text: css`
    color: ${colors.gray300};
  `,
}

export const Text = styled.Text`
  ${fonts.btn1};
  color: ${colors.gray500};
`
