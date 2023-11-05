import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Css = {
  modal: css`
    align-items: center;
    justify-content: center;
  `,
}

export const Container = styled.View`
  background-color: ${colors.white};
  min-width: 277px;
  opacity: 0.9;
  padding: 30px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  ${fonts.subtitle2};
  color: ${colors.black};
  text-align: center;
  margin-bottom: 20px;
`

export const Description = styled.Text`
  ${fonts.body3};
  color: ${colors.gray400};
  margin-top: 20px;
`

export const ButtonBorder = styled.View`
  margin-top: 21px;
`

export const DialogImage = styled.Image``
