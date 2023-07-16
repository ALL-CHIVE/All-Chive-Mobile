import styled from '@emotion/native'
import { FlatList } from 'react-native'

import { SimpleContent } from '@/models/SimpleContent'

export const Container = styled.ScrollView``

export const ContentListContainer = styled(FlatList<SimpleContent>)`
  margin: auto;
  flex-direction: row;
`
