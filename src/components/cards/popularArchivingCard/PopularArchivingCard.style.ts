import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  margin: 0 6px;
`

export const Card = styled.View`
  width: 186px;
  height: 235px;
  border-radius: 10px;
  background-color: ${colors.white};
  flex-direction: row;
  overflow: hidden;
  background-color: ${colors.black};
`

export const ArchivingImage = styled.Image`
  position: absolute;
  width: 186px;
  height: 235px;
  opacity: 0.6;
`

export const Title = styled.Text`
  ${fonts.title1};
  color: ${colors.white};
  top: 17px;
  left: 15px;
  width: 135px;
`

export const Scrap = styled.TouchableOpacity`
  position: absolute;
  right: 3px;
  top: 12px;
  padding: 5px;
`

export const ScarpIcon = styled.Image``

export const CountContainer = styled.View`
  position: absolute;
  flex-direction: row;
  bottom: 10px;
  right: 12px;
  padding: 2px 7px;
  background-color: ${colors.gray500};
  border-radius: 4px;
  align-items: center;
  opacity: 0.7;
`

export const CountText = styled.Text`
  ${fonts.body4};
  color: ${colors.white};
  margin: 0 4px;
`

export const Icon = styled.Image``
