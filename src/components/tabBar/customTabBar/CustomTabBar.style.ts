import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const TabBarWrapper = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-left: 4px;
`

export const TabButton = styled.TouchableOpacity<{ isFocused: boolean }>`
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0px 18px;
  border-bottom-width: ${(props) => (props.isFocused ? '2px' : '0px')};
  border-bottom-color: ${colors.yellow500};
`

export const TabText = styled.Text<{ isFocused: boolean }>`
  ${fonts.subtitle2}
  color: ${(props) => (props.isFocused ? colors.yellow500 : colors.gray400)}
`
