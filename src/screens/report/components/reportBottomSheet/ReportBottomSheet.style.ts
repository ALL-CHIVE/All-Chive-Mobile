import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 20px 20px 0px 0px;
  align-items: center;
`

export const Header = styled.View`
  margin-top: 28px;
  width: 100%;
  height: 34px;
`

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 26px;
`

export const ScrollContainer = styled.ScrollView``

export const Title = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
  text-align: center;
  margin-bottom: 25px;
`
