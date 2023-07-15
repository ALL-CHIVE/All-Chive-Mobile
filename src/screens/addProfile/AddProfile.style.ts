import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.SafeAreaView`
  height: 100%;
  margin: 0 6%;
`

export const Heading = styled.Text`
  ${fonts.heading2};
  margin-top: 20%;
`

export const NicknameContainer = styled.View`
  margin-top: 8%;
`

export const NicknameInputBox = styled.View`
  border-bottom-color: ${colors.gray600};
  border-bottom-width: 1px;
  padding: 10px 0;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10px;
  margin-bottom: 10px;
`

export const SelectButton = styled.View`
  margin: 20% 0;
`

export const BodyText = styled.Text`
  ${fonts.body1}
  margin-top: 5%;
  color: ${colors.gray600};
`

export const ClearButton = styled.TouchableOpacity`
  color: ${colors.gray600};
`

export const disabledStyle = {
  nicknameInputBox: css`
    border-bottom-color: ${colors.gray100};
  `,
  text: css`
    color: ${colors.gray100};
  `,
  clearButton: css`
    color: ${colors.gray100};
  `,
}
