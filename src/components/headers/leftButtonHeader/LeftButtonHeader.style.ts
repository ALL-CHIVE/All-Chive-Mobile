import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.SafeAreaView`
  height: 100px;
  width: 375px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${colors.white};
`

export const HeaderLeft = styled.TouchableOpacity`
  flex: 1;
  left: 20px;
`

export const Title = styled.Text`
  ${fonts.title2}
  flex: 1;
  text-align: center;
  color: ${colors.mainBlack};
`

export const RightButtonText = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray500};
  right: 20px;
`
