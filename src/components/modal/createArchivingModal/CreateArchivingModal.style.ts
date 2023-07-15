import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  position: absolute;
  width: 100%;
  /* height: 544px; */
  height: 500px;
  bottom: 0px;
  background-color: ${colors.white};
  border-radius: 20px 20px 0px 0px;
  padding: 64px 25px;
`

export const ModalTitle = styled.Text`
  ${fonts.title2}
  color: ${colors.mainBlack};
`

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 28px;
  right: 26px;
`

export const Title = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
`

export const TextInput = styled.TextInput`
  width: 100%;
  height: 38px;
  border: 1px solid ${colors.gray100};
  background-color: ${colors.white};
  color: ${colors.gray600};
  padding: 7px 10px 7px 13px;
  border-radius: 6px;
  margin-top: 10px;
`

export const Styles = {
  inputFocus: css`
    border: 1px solid ${colors.yellow500};
  `,
  inputWithValue: css`
    border: 1px solid ${colors.gray500};
  `,
  conditionComplete: css`
    color: ${colors.gray600};
  `,
}

export const Condition = styled.Text`
  ${fonts.body4}
  color: ${colors.gray100};
`
