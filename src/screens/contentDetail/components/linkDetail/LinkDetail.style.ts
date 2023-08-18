import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.TouchableOpacity`
  width: 325px;
  height: 247px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${colors.gray200};
`

export const LinkPreview = styled.Image`
  width: 100%;
  height: 155px;
  border-radius: 20px 20px 0 0;
`

export const TextContainer = styled.View`
  padding: 13px 20px;
`

export const Title = styled.Text`
  ${fonts.subtitle1}
  color: ${colors.mainBlack};
`

export const Description = styled.Text`
  ${fonts.body2}
  color: ${colors.gray500};
`

export const LinkText = styled.Text`
  ${fonts.body4}
  color: ${colors.gray300};
`
