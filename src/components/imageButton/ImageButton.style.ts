import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  align-items: center;
  margin: 5px 14px;
`

export const Image = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  border: 1px solid ${colors.black};
`

export const Title = styled.Text`
  ${fonts.body1};
`

export const ClickStyles = {
  image: css`
    border: 1px solid ${colors.mainYellow};
  `,
}
