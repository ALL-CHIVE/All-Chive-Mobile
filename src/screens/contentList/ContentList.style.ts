import styled, { css } from '@emotion/native'
import { FlatList } from 'react-native'

import { ContentCardInfo } from '@/models/ContentCard'
import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ContentListContainer = styled(FlatList<ContentCardInfo>)`
  width: 332px;
`

export const ScrollContainer = styled.ScrollView``

export const RowContainer = styled.View`
  flex-direction: row;
`

export const HeaderContainer = styled.View`
  align-items: center;
`

export const Category = styled.View`
  align-items: center;
  border-radius: 6px;
  padding: 2px 15px;
  background-color: ${colors.mainYellow};
`

export const Text = styled.Text`
  ${fonts.body2};
  color: ${colors.gray500};
`

export const WidthContainer = styled.View`
  width: 100%;
  padding: 0px 25px;
  margin-top: 0px;
`

export const ProfileContainer = styled.View`
  flex-direction: row;
  margin-top: 13px;
  margin-bottom: 30px;
`

export const ProfileImage = styled.Image`
  width: 37px;
  height: 37px;
  border-radius: 40px;
`

export const InfoContainer = styled.View`
  margin-left: 12px;
  flex-direction: column;
`

export const Nickname = styled.Text`
  ${fonts.body3};
  color: ${colors.mainBlack};
`

export const CreateAt = styled.Text`
  ${fonts.body4};
  color: ${colors.gray300};
`

export const Scrap = styled.TouchableOpacity`
  position: absolute;
  right: -15px;
  padding: 5px;
`

export const Container = styled.View`
  flex: 1;
`

export const SubTitleText = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
  margin-top: 23px;
`

export const Styles = {
  linearGradient: css`
    width: 100%;
    height: 230px;
    position: absolute;
    top: 0;
  `,
}
