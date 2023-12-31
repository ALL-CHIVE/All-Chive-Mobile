import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0px;
  background-color: ${colors.white};
  border-radius: 20px 20px 0px 0px;
  align-items: center;
`

export const ScrollContainer = styled.ScrollView`
  width: 375px;
  padding: 0px 25px;
`

export const ModalTitle = styled.Text`
  ${fonts.title2}
  color: ${colors.mainBlack};
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

export const Title = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
  margin-top: 20px;
  margin-bottom: 10px;
`

export const ImageButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 84px;
`

export const Styles = {
  inputFocus: css`
    border: 1px solid ${colors.yellow500};
  `,
  inputWithValue: css`
    border: 1px solid ${colors.gray500};
  `,
  conditionComplete: css`
    color: ${colors.gray600};
  `,
  cameraIcon: css`
    position: absolute;
    right: 0;
    bottom: -6px;
  `,
}

export const Thumbnail = styled.Image`
  width: 78px;
  height: 78px;
  border-radius: 4px;
`

export const Switch = styled.Switch`
  position: absolute;
  top: 15px;
  right: 0px;
`

export const NoticeText = styled.Text`
  ${fonts.body4}
  color: ${colors.gray200};
`

export const Bottom = styled.View`
  padding-bottom: 150px;
`
