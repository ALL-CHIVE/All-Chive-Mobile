import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray50};
`
export const TabBarWrapper = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin: 0px 25px;
`

export const TabButton = styled.TouchableOpacity<{ isFocused: boolean }>`
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0px 10px;
  margin-right: 24px;
  border-bottom-width: ${(props) => (props.isFocused ? '3px' : '0px')};
  border-bottom-color: ${colors.yellow500};
`

export const TabText = styled.Text<{ isFocused: boolean }>`
  ${fonts.subtitle2}
  color: ${(props) => (props.isFocused ? colors.yellow500 : colors.gray400)}
`
