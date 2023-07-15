import styled from '@emotion/native'
import { FlatList } from 'react-native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.SafeAreaView`
  height: 100%;
  margin: 0 auto;
`

export const Heading = styled.Text`
  ${fonts.heading1};
  color: ${colors.mainBlack};
  margin-top: 15%;
`

export const Description = styled.Text`
  ${fonts.title2}
  color: ${colors.gray500};
  margin-top: 3%;
  margin-bottom: 7%;
`
export const CategoryList = styled(FlatList<string>)`
  flex-direction: row;
  width: 100%;
  margin-bottom: 15%;
`

export const BoxButtonContainer = styled.View`
  margin-top: 3%;
  padding: 0 25px;
`
