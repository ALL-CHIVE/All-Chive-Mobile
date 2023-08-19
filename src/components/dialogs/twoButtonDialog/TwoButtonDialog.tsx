import React, { useState } from 'react'

import { Image, ImageSourcePropType } from 'react-native'
import Modal from 'react-native-modal'

import i18n from '@/locales'

import {
  Css,
  Container,
  Title,
  Description,
  Buttons,
  CancelButton,
  CancelButtonText,
  CompleteButton,
  CompleteButtonText,
} from './TwoButtonDialog.style'

interface TwoButtonDialogProps {
  isVisible: boolean
  title: string
  imageUrl?: ImageSourcePropType
  description?: string
  completeText: string
  onCancel: () => void
  onComplete: () => void
  onClose?: (isComplete: boolean) => void
}

/**
 * TwoButtonDialog
 */
const TwoButtonDialog = ({
  isVisible,
  title,
  imageUrl,
  description,
  completeText,
  onCancel,
  onComplete,
  onClose,
}: TwoButtonDialogProps) => {
  const [isComplete, setIsComplete] = useState(false)

  /**
   *
   */
  const handleComplete = () => {
    setIsComplete(true)
    onComplete()
  }

  return (
    <Modal
      style={Css.modal}
      statusBarTranslucent={true}
      isVisible={isVisible}
      onModalHide={() => onClose && onClose(isComplete)}
    >
      <Container>
        <Title>{i18n.t(title)}</Title>
        {imageUrl && (
          <Image
            style={{ width: 164, height: 144 }}
            source={imageUrl}
          />
        )}
        {description && <Description>{i18n.t(description)}</Description>}
        <Buttons>
          <CancelButton onPress={onCancel}>
            <CancelButtonText>{i18n.t('cancel')}</CancelButtonText>
          </CancelButton>
          <CompleteButton onPress={handleComplete}>
            <CompleteButtonText>{i18n.t(completeText)}</CompleteButtonText>
          </CompleteButton>
        </Buttons>
      </Container>
    </Modal>
  )
}

export default TwoButtonDialog
