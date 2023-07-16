import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Css = {
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
`

export const CancleButton = styled.TouchableOpacity`
  width: 102px;
  height: 36px;
  background-color: ${colors.gray500};
  border-radius: 8px;
  padding: 5px 37px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

export const CompleteButton = styled.TouchableOpacity`
  width: 102px;
  height: 36px;
  background-color: ${colors.mainYellow};
  border-radius: 8px;
  padding: 5px 37px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

export const CancleButtonText = styled.Text`
  ${fonts.btn1}
  color: ${colors.white}
`

export const CompleteButtonText = styled.Text`
  ${fonts.btn1}
  color: ${colors.gray500}
`
