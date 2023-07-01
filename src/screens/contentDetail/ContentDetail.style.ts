import styled from '@emotion/native'

import { fonts } from '@/styles/fonts'

export const ContentDetailView = styled.View`
  background-color: white;
  height: 100%;
  padding: 0 20px;
  padding-bottom: 100px;
`

export const PreviewContainer = styled.View`
  align-items: center;
`

export const TagList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export const SubTitle = styled.Text`
  ${fonts.title2}
`
