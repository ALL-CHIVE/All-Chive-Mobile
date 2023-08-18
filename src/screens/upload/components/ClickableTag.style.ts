import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  width: auto;
  background-color: ${colors.white};
  padding: 4px 15px;
  border-radius: 20px;
  border: 1px solid ${colors.gray300};
  margin-right: 8px;
`

export const Text = styled.Text`
  ${fonts.body2}
  color: ${colors.gray300};
`

export const RowView = styled.View`
  flex-direction: row;
`
