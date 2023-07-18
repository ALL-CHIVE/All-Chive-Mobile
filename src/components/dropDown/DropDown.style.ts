import styled from '@emotion/native'

import { colors } from '@/styles/colors'

export const Container = styled.View``

export const Input = styled.TextInput`
  width: 100%;
  height: 38px;
  border: 1px solid ${colors.gray100};
  background-color: ${colors.white};
  padding: 7px 10px 7px 13px;
  border-radius: 6px;
`

export const DropDownModal = styled.View`
  width: 100%;
  height: 144px;
  border: 1px solid ${colors.yellow500};
  background-color: ${colors.white};
  padding-left: 20px;
  border-radius: 6px;
`

export const TouchableItem = styled.TouchableOpacity`
  width: 100%;
  margin: 5px 0px;
`
