import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ArchivingContainer = styled.View`
  padding: 0 25px;
`

export const SearchBar = styled.TouchableOpacity`
  width: 300px;
  height: 34px;
  border-radius: 19.5px;
  background-color: ${colors.white};
  margin-top: 27px;
  /* 돋보기 아이콘 추가 */
`

export const NicknameText = styled.Text`
  font-family: ${fonts.subtitle1};
  color: ${colors.gray600};
  margin-top: 28px;
`

export const TitleText = styled.Text`
  font-family: ${fonts.heading2};
  color: ${colors.gray600};
`

export const CategoryContainer = styled.View`
  flex-direction: row;
  margin-top: 180px;
`

export const CategoryListContainer = styled.View`
  /* TODO */
`
