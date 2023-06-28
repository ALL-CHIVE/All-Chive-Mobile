import styled from '@emotion/native'

export const TagContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.black};
  padding: 10px;
  border-radius: 7px;
  margin-top: 10px;
  margin-right: 7px;
`

export const TagText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
`
