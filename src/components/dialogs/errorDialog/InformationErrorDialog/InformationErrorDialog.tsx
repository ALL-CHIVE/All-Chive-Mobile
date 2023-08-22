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
  Buttons,
  RetryButton,
  RetryButtonText,
  CompleteButton,
  CompleteButtonText,
} from '../ErrorDialog.style'

interface InformationErrorDialogProps {
  isVisible: boolean
  onClick: () => void
  onRetry: () => void
}

/**
 * InformationErrorDialog
 */
export const InformationErrorDialog = ({
  isVisible,
  onClick,
  onRetry,
}: InformationErrorDialogProps) => {
  return (
    <Modal
      style={Css.modal}
      isVisible={isVisible}
      statusBarTranslucent={true}
      onModalHide={onClick}
    >
      <Container>
        <Title>{i18n.t('couldntGetInformation')}</Title>
        <Image
          style={{
            width: 120.96,
            height: 143.95,
          }}
          source={defaultImages.informationError}
        />
        <Description>{i18n.t('pleaseRetryLittleWhile')}</Description>
        <Buttons>
          <RetryButton onPress={onRetry}>
            <RetryButtonText>{i18n.t('errorDialogRetry')}</RetryButtonText>
          </RetryButton>
          <CompleteButton onPress={onClick}>
            <CompleteButtonText>{i18n.t('confirm')}</CompleteButtonText>
          </CompleteButton>
        </Buttons>
      </Container>
    </Modal>
  )
}
