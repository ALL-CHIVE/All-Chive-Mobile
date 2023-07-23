import styled from '@emotion/native'

import { colors } from '@/styles/colors'

export const Container = styled.View`
  height: 34px;
  border-radius: 19.5px;
  background-color: ${colors.white};
`

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
`

export const Icon = styled.Image`
  margin-left: 14px;
`
