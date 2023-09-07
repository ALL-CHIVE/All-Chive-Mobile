import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
`

export const InputBox = styled.TextInput`
  color: ${colors.gray600};
  padding: 0;
  margin: 0;
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  flex: 1;
  height: 40px;
`

export const ClearButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`

export const Styles = {
  border: css`
    width: 100%;
    height: 38px;
    border: 1px solid ${colors.gray200};
    background-color: ${colors.white};
    color: ${colors.gray600};
    padding: 7px 10px 7px 13px;
    border-radius: 6px;
    margin-bottom: 6px;
  `,
}
