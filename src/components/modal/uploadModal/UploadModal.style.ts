import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'

export const Container = styled.View`
  height: 245px;
  width: 245px;
  margin-bottom: 34px;
`
export const Styles = {
  linearGradient: css`
    height: 100%;
    width: 100%;
    border-radius: 150px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  `,
  uploadButton: css`
    border-radius: 100px;
  `,
}

export const LeftButton = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  left: 17%;
  top: 25%;
`

export const Icon = styled.Image`
  margin-bottom: 8px;
`

export const RightButton = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  right: 20%;
  top: 25%;
`

export const UploadButton = styled.View`
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
`
