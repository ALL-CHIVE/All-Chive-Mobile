import styled from '@emotion/native'
import { FlatList } from 'react-native'

import { SimpleContent } from '@/models/SimpleContent'
import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ContentListContainer = styled(FlatList<SimpleContent>)``

export const ScrollContainer = styled.ScrollView`
  padding: 0px 20px;
  width: 375px;
`

export const HeaderContainer = styled.View`
  align-items: center;
`

export const Category = styled.View`
  max-width: 77px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 4px 15px;
  background-color: ${colors.mainYellow};
  margin-right: 11px;
  left: 25px;
`

export const Text = styled.Text`
  ${fonts.body2};
  color: ${colors.gray500};
`

export const WidthContainer = styled.View`
  width: 375px;
`

export const ProfileContainer = styled.View`
  flex-direction: row;
  left: 25px;
  top: 13px;
  margin-bottom: 30px;
`

export const ProfileImage = styled.Image`
  width: 41px;
  height: 41px;
  border-radius: 40px;
`

export const Nickname = styled.Text`
  ${fonts.body3};
  color: ${colors.mainBlack};
  left: 10px;
`

export const CreateAt = styled.Text`
  ${fonts.body4};
  color: ${colors.gray300};
`

export const Scrap = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  padding: 5px;
`
