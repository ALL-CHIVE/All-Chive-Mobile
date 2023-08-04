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
  padding: 30px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  ${fonts.subtitle2};
  color: ${colors.black};
  text-align: center;
  margin-bottom: 23px;
`

export const TextInputContainer = styled.View`
  display: flex;
`

export const TextInput = styled.TextInput`
  width: 229px;
  height: 37px;
  border: 1px solid ${colors.gray500};
  background-color: ${colors.white};
  color: ${colors.mainBlack};
  padding: 7px 15px;
  border-radius: 6px;
`

export const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  right: 12px;
`

export const Buttons = styled.View`
  flex-direction: row;
  margin-top: 20px;
`

export const CancelButton = styled.TouchableOpacity`
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

export const CancelButtonText = styled.Text`
  ${fonts.btn1}
  color: ${colors.white};
`

export const CompleteButtonText = styled.Text`
  ${fonts.btn1}
  color: ${colors.gray500};
`

export const DisabledStyles = {
  button: css`
    background-color: ${colors.gray50};
  `,
  text: css`
    color: ${colors.gray300};
  `,
}
