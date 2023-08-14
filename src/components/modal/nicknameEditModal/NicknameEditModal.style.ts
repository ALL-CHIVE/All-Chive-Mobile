import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  width: 375px;
  height: 100%;
  padding: 0px 25px;
`

export const Header = styled.View`
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Button = styled.TouchableOpacity``

export const ButtonText = styled.Text`
  ${fonts.subtitle1}
  color: ${colors.gray300};
`

export const Title = styled.Text`
  ${fonts.title2}
  color: ${colors.gray50};
`

export const NicknameContainer = styled.ScrollView`
  margin-top: 186px;
`

export const NicknameInputBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 37px;
  border-radius: 6px;
  background-color: ${colors.white};
  overflow: hidden;
`

export const InputBox = styled.TextInput`
  flex: 1;
`

export const ClearButton = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  right: 0px;
  width: 24px;
  height: 24px;
`

export const VerifierContainer = styled.View``

export const Icon = styled.Image`
  width: 10px;
  height: 10px;
  margin-right: 5px;
`

export const Text = styled.Text`
  ${fonts.body4}
  color: ${colors.gray50};
`

export const Styles = {
  buttonEnable: css`
    color: ${colors.gray50};
  `,
}
