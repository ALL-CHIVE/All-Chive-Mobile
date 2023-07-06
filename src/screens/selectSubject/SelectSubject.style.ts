import styled from '@emotion/native'
import { FlatList } from 'react-native'

import { fonts } from '@/styles/fonts'

export const Container = styled.SafeAreaView`
  height: 100%;
  margin: 0 6%;
`

export const Heading = styled.Text`
  ${fonts.heading1};
  margin-top: 20%;
`

export const Description = styled.Text`
  ${fonts.title2}
  margin-bottom: 10%;
`
export const SubjectList = styled(FlatList<string>)`
  flex-direction: row;
  width: 100%;
`

export const SelectButton = styled.View`
  margin: 20% 0;
`
