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
  padding: 30px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  ${fonts.subtitle2};
  color: ${colors.black};
  text-align: center;
`

export const Description = styled.Text`
  ${fonts.body3};
  color: ${colors.gray400};
  margin-top: 20px;
`

export const Buttons = styled.View`
  flex-direction: row;
  margin-top: 20px;
  width: 216.5px;
  justify-content: space-between;
`
