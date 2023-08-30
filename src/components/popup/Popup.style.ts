import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'
import { fonts } from '@/styles/fonts'

export const Container = styled.View`
  padding: 12px 8px;
`

export const Title = styled.Text`
  ${fonts.body3}
  color: ${colors.mainBlack};
`

export const Styles = {
  container: css`
    margin-top: 24px;
    width: auto;
    border-radius: 4px;
    border: 0.5px solid ${colors.gray200};
    background-color: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  `,
  background: css`
    position: absolute;
    width: 100%;
    height: 100%;
  `,
  menuOption: css`
    align-items: center;
    padding: 8px 14px;
  `,
}

export const Divider = styled.View`
  height: 0.5px;
  width: 20px;
  background-color: ${colors.gray200};
`
