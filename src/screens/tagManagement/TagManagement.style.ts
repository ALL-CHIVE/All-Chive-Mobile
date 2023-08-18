import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ScrollContainer = styled.ScrollView`
  width: 100%;
`

export const PlusButton = styled.TouchableOpacity`
  width: 76px;
  height: 28px;
  padding: 5px 10px;
  border-radius: 30px;
  margin: 37px auto;
  background-color: ${colors.yellow200};
`

export const DeleteButton = styled.TouchableOpacity`
  width: 45px;
  height: 28px;
  padding: 5px 10px;
  border-radius: 30px;
  background-color: ${colors.gray50};
  border: 1px solid ${colors.gray300};
  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  ${fonts.body4}
  color: ${colors.gray500};
`

export const TagListContainer = styled.View`
  padding: 10px 0px;
  margin: 0px 25px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray50};
  align-items: center;
`

export const Text = styled.Text`
  ${fonts.body1}
  color: ${colors.mainBlack};
  width: ;
`
