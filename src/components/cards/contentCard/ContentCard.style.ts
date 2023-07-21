import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  margin: 5px;
`

export const Card = styled.View`
  background-color: ${colors.white};
  border-radius: 9px;
  width: 158px;
  height: 165px;
  overflow: hidden;
`

export const ImageContainer = styled.View`
  height: 50%;
`

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`

export const Type = styled.View`
  position: absolute;
  top: 5px;
  right: 10px;
  border-radius: 4px;
  padding: 2px 7px;
  background-color: rgba(255, 255, 255, 0.1);
`

export const TypeText = styled.Text`
  ${fonts.body4}
  color: ${colors.white};
`
export const Information = styled.View`
  padding: 5px 10px;
`

export const Title = styled.Text`
  ${fonts.subtitle2};
  color: ${colors.black};
`

export const Day = styled.Text`
  ${fonts.body4};
  color: ${colors.gray600};
`

export const TagContainer = styled.View`
  flex-direction: row;
  margin: 5px 0;
`

export const Styles = {
  shadow: css`
    border-radius: 9px;
  `,
}
