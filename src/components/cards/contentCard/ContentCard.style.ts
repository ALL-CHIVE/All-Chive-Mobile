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
  height: 80px;
  background-color: ${colors.black};
`

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  opacity: 0.6;
`

export const Type = styled.View`
  position: absolute;
  top: 12px;
  right: 9px;
  border-radius: 4px;
  padding: 1px 7px;
  background-color: rgba(255, 255, 255, 0.3);
  flex-direction: row;
  align-items: center;
`

export const TypeText = styled.Text`
  ${fonts.body4}
  color: ${colors.white};
  margin-left: 3px;
`
export const Information = styled.View`
  padding: 9px 10px 10.5px 10px;
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
  margin: 5.5px 0;
`

export const Styles = {
  shadow: css`
    border-radius: 9px;
  `,
}

export const Icon = styled.Image`
  width: 10px;
  height: 10px;
`
