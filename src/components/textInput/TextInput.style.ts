import styled from '@emotion/native'

import { colors } from '@/styles/colors'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
`

export const InputBox = styled.TextInput`
  color: ${colors.gray600};
  padding: 0;
  margin: 0;
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  flex: 1;
  height: 40px;
`

export const ClearButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`
