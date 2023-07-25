import styled from '@emotion/native'

import { colors } from '@/styles/colors'

export const TextInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.gray50};
  color: ${colors.gray300};
  padding: 0 40px 0 35px;
  margin-top: 26px;
  margin-bottom: 20px;
`

export const Container = styled.View`
  position: relative;
  width: 95%;
  margin-left: 15px;
`

export const SearchImage = styled.Image`
  position: absolute;
  top: 40px;
  left: 10px;
`

export const RemoveImageContainer = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  right: 20px;
`

export const RemoveImage = styled.Image`
  width: 9px;
  height: 9px;
`
