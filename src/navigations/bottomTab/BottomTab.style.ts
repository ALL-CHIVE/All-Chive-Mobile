import styled, { css } from '@emotion/native'

import { colors } from '@/styles/colors'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`

export const Styles = {
  linearGradient: css`
    position: absolute;
    bottom: 64px;
    border-radius: 100px;
  `,
}

export const UploadButton = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
`
export const UploadModal = styled.ImageBackground`
  position: absolute;
  width: 453px;
  height: 270px;
  left: -40px;
  bottom: -80px;
  justify-content: center;
  align-items: center;
  opacity: 80;
`
