import styled from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  width: 375px;
  padding: 0 25px;
`

export const Title = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
  margin-top: 22px;
  margin-bottom: 10px;
`

export const ArchivingSelect = styled.TouchableOpacity`
  width: 100%;
  height: 38px;
  border-width: 1px;
  background-color: ${colors.white};
  padding: 7px 10px 7px 13px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const SelectArchivingText = styled.Text`
  color: ${colors.gray200};
  ${fonts.body1}
`

export const PlusImageButton = styled.TouchableOpacity`
  width: 78px;
  height: 78px;
  border-radius: 4px;
  background-color: ${colors.gray100};
  justify-content: center;
  align-items: center;
`

export const ContentImage = styled.Image`
  width: 78px;
  height: 78px;
  border-radius: 4px;
`

export const TagTitleContainer = styled.View`
  margin-top: 22px;
  margin-bottom: 10px;
  flex-direction: row;
`

export const TagTitle = styled.Text`
  ${fonts.subtitle2}
  color: ${colors.gray600};
  margin-right: 12px;
`

export const AddTagButton = styled.TouchableOpacity`
  width: 85px;
  height: 29px;
  border-radius: 30px;
  background-color: ${colors.gray100};
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  margin-right: 8px;
`

export const AddTagText = styled.Text`
  ${fonts.body2}
  color: ${colors.gray300};
`

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`
