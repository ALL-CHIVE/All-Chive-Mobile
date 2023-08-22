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

export const Buttons = styled.View`
  flex-direction: row;
  margin-top: 20px;
`

export const OneButton = styled.TouchableOpacity`
  min-width: 197px;
  height: 36px;
  background-color: ${colors.gray500};
  border-radius: 8px;
  padding: 5px 0px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export const RetryButton = styled.TouchableOpacity`
  width: 102px;
  height: 36px;
  background-color: ${colors.mainYellow};
  border-radius: 8px;
  padding: 5px 0px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

export const CompleteButton = styled.TouchableOpacity`
  width: 102px;
  height: 36px;
  background-color: ${colors.gray500};
  border-radius: 8px;
  padding: 5px 0px;
  align-items: center;
  justify-content: center;
`

export const CompleteButtonText = styled.Text`
  ${fonts.btn1};
  color: ${colors.white};
`

export const RetryButtonText = styled.Text`
  ${fonts.btn1};
  color: ${colors.gray500};
`
