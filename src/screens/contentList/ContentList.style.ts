import styled from '@emotion/native'
import { FlatList } from 'react-native'

import { SimpleContent } from '@/models/SimpleContent'

export const Container = styled.View`
  padding: 0px 20px;
`

export const ContentListContainer = styled(FlatList<SimpleContent>)``
