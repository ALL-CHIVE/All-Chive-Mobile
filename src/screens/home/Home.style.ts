import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  margin: 0 auto;
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 27px 0;
`

export const ProfileImage = styled.Image`
  width: 38px;
  height: 38px;
`

export const SearchBar = styled.TouchableOpacity`
  width: 300px;
  height: 34px;
  border-radius: 19.5px;
  background-color: ${colors.white};
  margin-right: 10px;
  /* 돋보기 아이콘 추가 */
`

export const Greeding = styled.View`
  margin-bottom: 180px;
  margin-left: 25px;
`

export const NicknameText = styled.Text`
  ${fonts.subtitle1};
  color: ${colors.gray600};
`

export const Title = styled.Text`
  ${fonts.heading2};
  color: ${colors.gray600};
`

export const ArchivingListContainer = styled.View`
  margin-top: 5px;
  align-items: center;
`
