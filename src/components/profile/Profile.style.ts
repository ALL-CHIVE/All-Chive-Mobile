import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  align-items: center;
`
export const ProfileImage = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 65px;
  background-color: ${colors.gray95};
`

export const UploadButton = styled.TouchableOpacity`
  background-color: ${colors.mainYellow};
  padding: 5px 20px;
  border-radius: 25px;
  margin-top: 7%;
`
export const ButtonText = styled.Text`
  ${fonts.body2}
  color: ${colors.gray600}
`
