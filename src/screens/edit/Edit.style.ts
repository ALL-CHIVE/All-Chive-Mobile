import styled, { css } from '@emotion/native'

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
  border: 1px solid ${colors.gray100};
  background-color: ${colors.white};
  padding: 7px 10px 7px 13px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
`

export const SelectArchivingText = styled.Text`
  color: ${colors.gray100};
`

export const TextInput = styled.TextInput`
  width: 100%;
  height: 38px;
  border: 1px solid ${colors.gray100};
  background-color: ${colors.white};
  color: ${colors.gray600};
  padding: 7px 10px 7px 13px;
  border-radius: 6px;
`

export const MemoTextInput = styled.TextInput`
  width: 100%;
  min-height: 38px;
  border: 1px solid ${colors.gray100};
  background-color: ${colors.white};
  color: ${colors.gray600};
  padding: 7px 10px 7px 13px;
  border-radius: 6px;
`

export const Styles = {
  focused: css`
    border: 1px solid ${colors.yellow500};
  `,
  clickedText: css`
    color: ${colors.gray600};
  `,
  clicked: css`
    border: 1px solid ${colors.gray500};
    color: ${colors.gray600};
  `,
  conditionComplete: css`
    color: ${colors.gray600};
  `,
  rightArrow: css`
    position: absolute;
    right: 10px;
  `,
}

export const Condition = styled.View`
  flex-direction: row;
`

export const ConditionText = styled.Text`
  ${fonts.body4}
  color: ${colors.gray100};
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
`

export const AddTagText = styled.Text`
  ${fonts.body2}
  color: ${colors.gray300};
`

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`
