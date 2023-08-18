import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  width: 100%;
  flex: 1;
`

export const BottomButtonContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 118px;
  bottom: 0px;
  opacity: 0.8;
`

export const BottomButton = styled.TouchableOpacity``

export const BottomButtonTitle = styled.Text`
  ${fonts.title2}
  color: ${colors.mainBlack};
`

export const BottomButtonText = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray500};
`
