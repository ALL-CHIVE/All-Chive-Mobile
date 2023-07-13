import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  align-items: center;
  margin: 5px 14px;
`

export const ImageView = styled.View`
  border-radius: 50px;
  width: 80px;
  height: 80px;
  align-items: center;
  background-color: ${colors.white};
  justify-content: center;
`

export const Image = styled.Image`
  width: 40px;
  height: 40px;
`

export const Title = styled.Text`
  ${fonts.body1};
  color: ${colors.mainBlack};
`

export const ClickStyles = {
  image: css`
    border: 4px solid ${colors.mainYellow};
    background-color: ${colors.yellow200};
  `,
}
