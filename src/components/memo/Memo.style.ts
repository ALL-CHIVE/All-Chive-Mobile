import styled from '@emotion/native'

export const MemoContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.gray95};
  padding: 10px;
  border-radius: 7px;
  margin-top: 10px;
  margin-right: 7px;
`

export const MemoText = styled.Text`
  color: ${({ theme }) => theme.colors.gray300};
`
