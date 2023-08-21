import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  height: 24px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 23px;
  align-items: center;
`

export const Title = styled.Text`
  ${fonts.body1}
  color: ${colors.mainBlack}
`
