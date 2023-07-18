import styled from '@emotion/native'
import { FlatList } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Heading = styled.Text`
  ${fonts.heading1};
  color: ${colors.mainBlack};
  margin-top: 119px;
`

export const Description = styled.Text`
  ${fonts.title2}
  color: ${colors.gray500};
  margin-top: 15px;
  margin-bottom: 33px;
`
export const CategoryList = styled(FlatList<string>)``
