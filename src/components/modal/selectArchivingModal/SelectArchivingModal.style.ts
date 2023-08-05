import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const ModalContainer = styled.View`
  width: 100%;
  height: 519px;
  background-color: ${colors.white};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  align-items: center;
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

export const ArchivingHeader = styled.View`
  width: 375px;
  padding: 0px 25px 25px 25px;
  flex-direction: row;
  justify-content: space-between;
`

export const Container = styled.View`
  padding: 0px 25px;
`

export const Title = styled.Text`
  ${fonts.title2}
  color: ${colors.mainBlack};
`

export const AddArchivingButton = styled.TouchableOpacity`
  padding: 5px 10px;
  border-radius: 30px;
  background-color: ${colors.yellow200};
`

export const AddArchivingText = styled.Text`
  ${fonts.body4}
  color: ${colors.gray500};
`

export const ListContainer = styled.View``

export const CategoryTitle = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.mainBlack};
  left: 25px;
`

export const ArchivingButton = styled.TouchableOpacity`
  flex-direction: row;
  left: 32px;
  align-items: center;
`

export const ArchivingTitle = styled.Text`
  ${fonts.body1}
  color: ${colors.gray300};
  margin-left: 13px;
  margin-right: 5px;
`

export const Styles = {
  SelectedArchiving: css`
    color: ${colors.gray500};
  `,
}
