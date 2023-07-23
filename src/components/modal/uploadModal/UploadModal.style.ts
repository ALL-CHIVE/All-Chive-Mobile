import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'

export const Container = styled.View`
  height: 250px;
  width: 100%;
`
export const Styles = {
  linearGradient: css`
    height: 100%;
    width: 100%;
    opacity: 0.8;
    border-top-right-radius: 100px;
    border-top-left-radius: 100px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  `,
}

export const LeftButton = styled.TouchableOpacity`
  border-right-width: 1px;
  border-right-color: ${colors.gray600};
  height: 50%;
  width: 150px;
  align-items: center;
  justify-content: center;
`

export const Icon = styled.Image`
  margin-bottom: 8px;
`

export const RightButton = styled.TouchableOpacity`
  height: 100%;
  width: 150px;
  align-items: center;
  justify-content: center;
`
