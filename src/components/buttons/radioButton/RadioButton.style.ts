import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  border-bottom-color: ${colors.gray50};
  border-bottom-width: 1px;
`

export const Radio = styled.View`
  height: 22px;
  width: 22px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${colors.gray100};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

export const SelectedStyles = {
  radio: css`
    border-color: ${colors.gray600};
    background-color: ${colors.gray600};
  `,
}

export const SelectedIcon = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 6px;
  background-color: ${colors.white};
`

export const Message = styled.Text`
  ${fonts.body1}
  color: ${colors.black}
`
