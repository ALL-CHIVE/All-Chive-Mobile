import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.SafeAreaView`
  height: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const HeaderLeft = styled.TouchableOpacity``

export const Title = styled.Text`
  ${fonts.title2}
  width: 75%;
  text-align: center;
`
