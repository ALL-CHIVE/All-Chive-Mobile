import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  align-items: center;
`

export const SubLogo = styled.Text`
  ${fonts.body2}
  color: ${colors.gray600};
  margin-bottom: 5px;
`

export const Logo = styled.Image`
  width: 163px;
  height: 30.24px;
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
