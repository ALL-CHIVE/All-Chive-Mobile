import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 29px;
  border-radius: 6px;
  padding: 4px 15px;
  background-color: ${colors.yellow200};
  margin-bottom: 17px;
  margin-right: 11px;
`

export const Styles = {
  click: css`
    background-color: ${colors.mainYellow};
    color: ${colors.gray500};
  `,
}

export const Text = styled.Text`
  ${fonts.body2};
  color: ${colors.gray300};
`
