import React from 'react'

import { Image } from 'react-native'
import Modal from 'react-native-modal'

import { defaultImages } from '@/assets'
import i18n from '@/locales'

import {
  Css,
  Container,
  Title,
  Description,
  OneButton,
  CompleteButtonText,
} from '../ErrorDialog.style'

interface TemporaryErrorDialogProps {
  isVisible: boolean
  onClick: () => void
}

/**
 * TemporaryErrorDialog
 */
export const TemporaryErrorDialog = ({ isVisible, onClick }: TemporaryErrorDialogProps) => {
  return (
    <Modal
      style={Css.modal}
      isVisible={isVisible}
      statusBarTranslucent={true}
      onModalHide={onClick}
    >
      <Container>
        <Title>{i18n.t('temporaryError')}</Title>
        <Image
          style={{
            width: 133.37,
            height: 137,
          }}
          source={defaultImages.temporaryError}
        />
        <Description>{i18n.t('pleaseRetryLittleWhile')}</Description>
        <OneButton onPress={onClick}>
          <CompleteButtonText>{i18n.t('confirm')}</CompleteButtonText>
        </OneButton>
      </Container>
    </Modal>
  )
}
