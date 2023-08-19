import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  padding: 0 24px;
`

export const Heading = styled.Text`
  ${fonts.heading1};
  color: ${colors.mainBlack};
  margin-top: 75px;
  margin-bottom: 75px;
`

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`

export const Title = styled.Text`
  ${fonts.subtitle1};
  color: ${colors.mainBlack};
  left: 16px;
`

export const Description = styled.Text`
  ${fonts.body4};
  color: ${colors.gray400};
  left: 30px;
  top: -14px;
`

export const CheckBox = styled.TouchableOpacity`
  width: 14px;
  height: 14px;
  border: 1px solid ${colors.gray500};
  background-color: ${colors.white};
`

export const Styles = {
  checkIcon: css`
    top: -8px;
    left: -3px;
  `,
}

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray100};
  margin-bottom: 20px;
`

export const RightButton = styled.TouchableOpacity`
  position: absolute;
  padding: 10px;
  right: 0px;
`
