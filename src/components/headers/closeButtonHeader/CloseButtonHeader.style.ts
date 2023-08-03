import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  width: 375px;
  height: 89px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  width: 100%;
  ${fonts.title2}
  text-align: center;
  color: ${colors.gray600};
`

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 21px;
  padding: 5px;
`
