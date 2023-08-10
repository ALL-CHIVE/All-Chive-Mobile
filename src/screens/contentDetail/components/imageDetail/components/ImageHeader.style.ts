import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Header = styled.SafeAreaView`
  background-color: ${colors.white};
  align-items: center;
`

export const Container = styled.View`
  width: 100%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export const Title = styled.Text`
  width: 100%;
  ${fonts.title2}
  text-align: center;
  color: ${colors.gray600};
`

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 21px;
  padding: 5px;
`
