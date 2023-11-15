import styled from '@emotion/native'

import { fonts } from '@/styles/fonts'

export const Button = styled.TouchableOpacity`
  height: 36px;
  padding: 0 37px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`

export const ButtonText = styled.Text`
  ${fonts.btn1}
`
