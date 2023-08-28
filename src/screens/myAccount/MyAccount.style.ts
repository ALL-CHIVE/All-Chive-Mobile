import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  padding: 0px 25px;
`

export const ProfileContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const ProfileImage = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 70px;
  margin-bottom: 12px;
`

export const Button = styled.TouchableOpacity`
  width: 83px;
  height: 35px;
  background-color: ${colors.mainYellow};
  border-radius: 25px;
  padding: 7px 29px;
`

export const ButtonText = styled.Text`
  ${fonts.body2}
  color: ${colors.gray500};
  text-align: center;
`

export const InfoContainer = styled.View`
  margin-top: 60px;
`

export const RowView = styled.View`
  flex-direction: row;
  margin: 5px 0px;
`

export const PencilButton = styled.TouchableOpacity`
  width: 14px;
  height: 15px;
  position: absolute;
  margin-top: 5px;
  right: 0px;
`

export const InfoText = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray400};
`

export const InfoTitle = styled.Text`
  ${fonts.body1};
  color: ${colors.mainBlack};
  width: 50px;
  margin-right: 15px;
`

export const WithdrawButton = styled.TouchableOpacity`
  min-width: 130px;
  height: 36px;
  background-color: ${colors.gray500};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  bottom: 49px;
`

export const WithdrawButtonText = styled.Text`
  ${fonts.btn1}
  color: ${colors.white};
`
