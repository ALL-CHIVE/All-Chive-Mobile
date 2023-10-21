import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 495px;
  bottom: 0px;
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

export const ContentContainer = styled.View`
  align-items: center;
`

export const Title = styled.Text`
  ${fonts.title2}
  color: ${colors.mainBlack}
`

export const SubTitle = styled.Text`
  ${fonts.subtitle1}
  color: ${colors.gray300};
`

export const ImageContainer = styled.View`
  height: 250px;
  align-items: center;
  justify-content: center;
`

export const GuideImage = styled.Image``
