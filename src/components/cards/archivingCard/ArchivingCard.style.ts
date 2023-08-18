import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  padding: 5px 5px;
  margin: 0 3px;
`

export const Card = styled.View`
  width: 325px;
  height: 107px;
  border-radius: 8px;
  background-color: ${colors.white};
  flex-direction: row;
`

export const ArchivingImage = styled.Image`
  width: 97px;
  height: 90px;
  top: 9px;
  left: 7px;
  border-radius: 8px;
  margin-right: 10px;
`

export const Title = styled.Text`
  ${fonts.subtitle1};
  color: ${colors.gray600};
  top: 13px;
  left: 10px;
  width: 152px;
`

export const Day = styled.Text`
  ${fonts.body4};
  position: absolute;
  bottom: 10px;
  left: 118px;
  color: ${colors.gray300};
`

export const CountContainer = styled.View`
  position: absolute;
  flex-direction: row;
  bottom: 10px;
  right: 12px;
  padding: 2px 7px;
  background-color: ${colors.gray200};
  border-radius: 4px;
  align-items: center;
`

export const CountText = styled.Text`
  ${fonts.body4};
  color: ${colors.white};
  margin: 0 4px;
`

export const Icon = styled.Image``

export const PopupContainer = styled.View`
  position: absolute;
  right: 8px;
  top: 6px;
`

export const Styles = {
  shadow: css`
    border-radius: 8px;
  `,
}

export const Scrap = styled.TouchableOpacity`
  position: absolute;
  right: 11px;
  top: 10px;
  padding: 5px;
  color: ${colors.gray500};
`

export const Pin = styled.View`
  position: absolute;
  right: 8px;
  top: 25px;
  padding: 5px;
`
