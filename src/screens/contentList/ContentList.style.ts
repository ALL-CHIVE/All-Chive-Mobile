import styled from '@emotion/native'
import { FlatList } from 'react-native'

import { SimpleContent } from '@/models/SimpleContent'

export const Container = styled.View`
  padding: 0px 25px;
`

export const ContentListContainer = styled(FlatList<SimpleContent>)``
