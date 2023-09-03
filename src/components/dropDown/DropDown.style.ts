import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  width: 100%;
`

export const DropDownButton = styled.TouchableOpacity`
  height: 38px;
  border: 1px solid ${colors.gray100};
  background-color: ${colors.white};
  padding: 7px 10px 7px 13px;
  border-radius: 6px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

export const Title = styled.Text`
  color: ${colors.gray100};
  ${fonts.body1}
`

export const DropDownModal = styled.View`
  width: 100%;
  height: 144px;
  border: 1px solid ${colors.yellow500};
  background-color: ${colors.white};
  padding-left: 20px;
  border-radius: 6px;
`

export const DropDownText = styled.Text`
  ${fonts.body1}
  margin-right: 7px;
  color: ${colors.mainBlack};
`

export const TouchableItem = styled.TouchableOpacity`
  width: 100%;
  margin: 2.5px 0px;
  flex-direction: row;
  align-items: center;
`

export const Styles = {
  selectedContainer: css`
    border: 1px solid ${colors.gray500};
  `,
  selectedText: css`
    color: ${colors.gray600};
  `,
}
