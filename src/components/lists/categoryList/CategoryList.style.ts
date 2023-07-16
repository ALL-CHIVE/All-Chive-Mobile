import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.ScrollView`
  flex-direction: row;
  background-color: ${colors.yellow100};
  padding-left: 25px;
  padding-bottom: 17px;
`

export const Category = styled.TouchableOpacity`
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
