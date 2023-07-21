import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  align-items: center;
`

export const SubLogo = styled.Image``

export const Logo = styled.Image`
  margin-top: 9px;
  margin-bottom: 47px;
`

export const Title = styled.Text`
  ${fonts.subtitle1};
  color: ${colors.gray600};
  margin-bottom: 13px;
`

export const LoginButtons = styled.View`
  flex-direction: row;
`
export const Button = styled.TouchableOpacity`
  margin: 0 5px;
`
