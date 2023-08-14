import React from 'react'

import { Image } from 'react-native'
import Modal from 'react-native-modal'

import { defaultImages } from '@/assets'
import i18n from '@/locales'

import { Css, Container, Title, Description, Button, ButtonText } from './ErrorDialog.style'

interface ErrorDialogProps {
  isVisible: boolean
  onClick: () => void
}

/**
 * ErrorDialog
 */
export const ErrorDialog = ({ isVisible, onClick }: ErrorDialogProps) => {
  return (
    <Modal
      style={Css.modal}
      isVisible={isVisible}
      onModalHide={onClick}
    >
      <Container>
        <Title>{i18n.t('couldntGetInformation')}</Title>
        <Image source={defaultImages.error} />
        <Description>{i18n.t('pleaseRetryLittleWhile')}</Description>
        <Button onPress={onClick}>
          <ButtonText>{i18n.t('retry')}</ButtonText>
        </Button>
      </Container>
    </Modal>
  )
}
