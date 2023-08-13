import React, { useState } from 'react'

import { Image } from 'react-native'
import Modal from 'react-native-modal'

import { defaultIcons } from '@/assets'
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
  DeleteButton,
  TextInputContainer,
  DisabledStyles,
} from './InputDialog.style'

interface InputDialogProps {
  isVisible: boolean
  title: string
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  completeText: string
  onCancel: () => void
  onComplete: () => void
  isDisabled?: boolean
  placeholder?: string
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
  isDisabled,
  placeholder,
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
        <TextInputContainer>
          <TextInput
            value={text}
            onChangeText={setText}
            maxLength={15}
            placeholder={placeholder}
          />
          {text.length > 0 && (
            <DeleteButton onPress={() => setText('')}>
              <Image source={defaultIcons.grayCloseButton} />
            </DeleteButton>
          )}
        </TextInputContainer>
        <Buttons>
          <CancelButton onPress={onCancel}>
            <CancelButtonText>{i18n.t('cancel')}</CancelButtonText>
          </CancelButton>
          <CompleteButton
            onPress={handleComplete}
            style={isDisabled && DisabledStyles.button}
            disabled={isDisabled}
          >
            <CompleteButtonText style={isDisabled && DisabledStyles.text}>
              {i18n.t(completeText)}
            </CompleteButtonText>
          </CompleteButton>
        </Buttons>
      </Container>
    </Modal>
  )
}
