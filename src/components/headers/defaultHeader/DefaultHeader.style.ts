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
  margin: 0 24px;
  width: 24px;
  height: 24px;
  justify-content: center;
`

export const Title = styled.Text`
  ${fonts.title2}
  flex: 1;
  text-align: center;
  color: ${colors.mainBlack};
`

export const HeaderRight = styled.View`
  margin: 0 24px;
`

export const RightButton = styled.TouchableOpacity`
  padding: 12px 8px;
`
