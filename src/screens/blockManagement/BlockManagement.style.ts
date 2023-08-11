import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const PlusButton = styled.TouchableOpacity`
  width: 76px;
  height: 28px;
  padding: 5px 10px;
  border-radius: 30px;
  margin: 37px auto;
  background-color: ${colors.yellow200};
`

export const UnblockButton = styled.TouchableOpacity`
  width: 70px;
  height: 30px;
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

export const ListContainer = styled.View`
  padding: 10px 30px;
  flex-direction: row;
  justify-content: space-between;
`

export const Text = styled.Text`
  ${fonts.body1}
  color: ${colors.mainBlack};
`

export const GrayDivider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray50};
  margin: 0px 25px;
`
