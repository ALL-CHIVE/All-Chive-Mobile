import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  display: flex;
  position: absolute;
  width: 100%;
  height: 439px;
  bottom: 0px;
  background-color: ${colors.white};
  border-radius: 20px 20px 0px 0px;
  padding: 0px 25px;
`

export const Title = styled.Text`
  ${fonts.title2}
  color: ${colors.mainBlack};
  top: 69px;
`

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 28px;
  right: 26px;
`

export const PlusButton = styled.TouchableOpacity`
  width: 100px;
  height: 28px;
  position: absolute;
  top: 69px;
  right: 25px;
  padding: 5px 10px;
  border-radius: 30px;
  background-color: ${colors.yellow200};
`

export const PlusButtonText = styled.Text`
  ${fonts.body4}
  color: ${colors.gray500};
  text-align: center;
`

export const ArchivingName = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.mainBlack};
  left: 25px;
`
