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
  width: 229px;
  height: 38px;
  border: 1px solid ${colors.gray500};
  background-color: ${colors.white};
  color: ${colors.gray500};
  padding: 0px 10px;
  border-radius: 6px;
  align-items: center;
`

export const TagVerifier = styled.View`
  margin-top: 4px;
  width: 220px;
`

export const Buttons = styled.View`
  flex-direction: row;
  margin-top: 20px;
  width: 216.5px;
  justify-content: space-between;
`

export const CompleteButton = styled.TouchableOpacity`
  width: 102px;
  height: 36px;
  background-color: ${colors.mainYellow};
  border-radius: 8px;
  padding: 5px 0px;
  align-items: center;
  justify-content: center;
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
