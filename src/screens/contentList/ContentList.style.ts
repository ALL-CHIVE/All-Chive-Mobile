import styled from '@emotion/native'
import { FlatList } from 'react-native'

import { SimpleContent } from '@/models/SimpleContent'

export const ContentListContainer = styled(FlatList<SimpleContent>)``

export const ScrollContainer = styled.ScrollView`
  padding: 0px 20px;
`
