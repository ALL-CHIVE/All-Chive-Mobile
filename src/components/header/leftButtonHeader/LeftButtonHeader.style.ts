import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.SafeAreaView`
  height: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const HeaderLeft = styled.TouchableOpacity`
  flex: 1;
  left: 20px;
`

export const Title = styled.Text`
  ${fonts.title2}
  width: 75%;
  text-align: center;
  color: ${colors.black};
`
