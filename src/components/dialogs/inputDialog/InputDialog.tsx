import React, { useState } from 'react'

import Modal from 'react-native-modal'

import i18n from '@/locales'

import {
  Css,
  Container,
  Title,
  Buttons,
  CancelButton,
  CancelButtonText,
  CompleteButton,
  CompleteButtonText,
  TextInput,
} from './InputDialog.style'

interface InputDialogProps {
  isVisible: boolean
  title: string
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  completeText: string
  onCancel: () => void
  onComplete: () => void
}

/**
 * InputDialog
 */
export const InputDialog = ({
  isVisible,
  title,
  text,
  setText,
  completeText,
  onCancel,
  onComplete,
}: InputDialogProps) => {
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
      isVisible={isVisible}
    >
      <Container>
        <Title>{i18n.t(title)}</Title>
        <TextInput
          value={text}
          onChangeText={setText}
        />
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
