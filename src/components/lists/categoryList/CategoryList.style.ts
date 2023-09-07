import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ScrollContainer = styled.ScrollView``

export const Container = styled.View`
  padding: 10px 14px 10px 25px;
  flex-direction: row;
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
    border: none;
  `,
  text: css`
    color: ${colors.gray500};
  `,
}

export const Text = styled.Text`
  ${fonts.body2};
  color: ${colors.gray300};
`
