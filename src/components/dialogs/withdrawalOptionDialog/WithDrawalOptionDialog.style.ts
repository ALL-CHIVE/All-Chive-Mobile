import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  background-color: ${colors.whiteOpacity90};
  width: 302px;
  height: 422px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  ${fonts.subtitle2};
  color: ${colors.black};
  margin-bottom: 9px;
`

export const Description = styled.Text`
  ${fonts.body4};
  color: ${colors.gray300};
`

export const Options = styled.View`
  margin-top: 19px;
  margin-bottom: 21px;
  width: 240px;
  height: 225px;
  background-color: ${colors.white};
  border-radius: 8px;
  padding-left: 23px;
  justify-content: center;
`

export const RowView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 4.5px 0px;
`

export const Option = styled.Text`
  ${fonts.body2};
  color: ${colors.gray500};
  margin-left: 12px;
`

export const Styles = {
  modal: css`
    justify-content: center;
    align-items: center;
  `,
}
