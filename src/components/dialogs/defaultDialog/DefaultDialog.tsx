import React from 'react'

import { Image, ImageSourcePropType } from 'react-native'
import Modal from 'react-native-modal'

import i18n from '@/locales'

import { Css, Container, Title, Description, Button, ButtonText } from './DefaultDialog.style'

interface DialogProps {
  isVisible: boolean
  title: string
  imageUrl: ImageSourcePropType
  description?: string
  buttonText: string
  onClick: () => void
}

/**
 * DefaultDialog
 */
const DefaultDialog = ({
  isVisible,
  title,
  imageUrl,
  description,
  buttonText,
  onClick,
}: DialogProps) => {
  return (
    <Modal
      style={Css.modal}
      isVisible={isVisible}
    >
      <Container>
        <Title>{i18n.t(title)}</Title>
        <Image source={imageUrl} />
        {description && <Description>{i18n.t(description)}</Description>}
        <Button onPress={onClick}>
          <ButtonText>{i18n.t(buttonText)}</ButtonText>
        </Button>
      </Container>
    </Modal>
  )
}

export default DefaultDialog
