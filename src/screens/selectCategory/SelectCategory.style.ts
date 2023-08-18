import styled from '@emotion/native'
import { FlatList } from 'react-native'

import { Category } from '@/models/enums/Category'
import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  align-items: center;
`

export const Heading = styled.Text`
  ${fonts.heading1};
  color: ${colors.mainBlack};
  margin-top: 75px;
`

export const Description = styled.Text`
  ${fonts.title2}
  color: ${colors.gray500};
  margin-top: 15px;
  margin-bottom: 33px;
`
export const CategoryList = styled(FlatList<Category>)``
