import React from 'react'

import { Image, ImageSourcePropType } from 'react-native'
import Modal from 'react-native-modal'

import i18n from '@/locales'

import {
  Css,
  Container,
  Title,
  Description,
  Button,
  ButtonText,
  DialogImage,
} from './DefaultDialog.style'

interface DialogProps {
  isVisible: boolean
  title: string
  imageUrl: ImageSourcePropType
  imageWidth: number
  imageHeight: number
  description?: string
  buttonText: string
  onClose?: () => void
  onClick: () => void
}

/**
 * DefaultDialog
 */
const DefaultDialog = ({
  isVisible,
  title,
  imageUrl,
  imageWidth,
  imageHeight,
  description,
  buttonText,
  onClose,
  onClick,
}: DialogProps) => {
  return (
    <Modal
      style={Css.modal}
      isVisible={isVisible}
      statusBarTranslucent={true}
      onModalHide={onClose}
    >
      <Container>
        <Title>{i18n.t(title)}</Title>
        <DialogImage
          source={imageUrl}
          style={{ width: imageWidth, height: imageHeight }}
        />
        {description && <Description>{i18n.t(description)}</Description>}
        <Button onPress={onClick}>
          <ButtonText>{i18n.t(buttonText)}</ButtonText>
        </Button>
      </Container>
    </Modal>
  )
}

export default DefaultDialog
