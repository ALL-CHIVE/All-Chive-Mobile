import styled from '@emotion/native'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`

export const BottomTabImage = styled.Image`
  width: 20px;
  height: 20px;
`

export const UploadButton = styled.TouchableOpacity`
  position: absolute;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-items: center;
  bottom: 64px;
  background-color: yellow; // 추후 변경
  border-radius: 100px;
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
