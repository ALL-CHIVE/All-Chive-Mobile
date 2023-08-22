import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Styles = {
  modal: css`
    justify-content: center;
    align-items: center;
  `,
}

export const Container = styled.View`
  background-color: ${colors.white};
  opacity: 0.9;
  width: 291px;
  height: 201px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  ${fonts.subtitle2};
  color: ${colors.black};
  text-align: center;
`

export const Button = styled.TouchableOpacity`
  width: 102px;
  height: 36px;
  background-color: ${colors.gray500};
  border-radius: 8px;
  padding: 5px 0px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`

export const ButtonText = styled.Text`
  ${fonts.btn1}
  color: ${colors.white}
`
