import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.SafeAreaView`
  height: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${colors.white};
`

export const HeaderLeft = styled.TouchableOpacity`
  margin: 0 24px;
`

export const Title = styled.Text`
  ${fonts.title2}
  flex: 1;
  text-align: center;
`

export const HeaderRight = styled.View`
  margin: 0 24px;
`
