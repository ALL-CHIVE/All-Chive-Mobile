import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  padding: 1px 25px 0px 25px;
  height: 100%;
`

export const Day = styled.Text`
  ${fonts.body1};
  color: ${colors.gray600};
  margin-bottom: 8px;
`

export const ContentDetailView = styled.View``

export const PreviewContainer = styled.View`
  align-items: center;
`

export const TagList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 8px;
`

export const SubTitle = styled.Text`
  ${fonts.title2}
  color: ${colors.gray600};
  margin-top: 28px;
`
