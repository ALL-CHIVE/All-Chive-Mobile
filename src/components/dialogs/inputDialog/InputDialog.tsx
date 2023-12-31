import React from 'react'

import Modal from 'react-native-modal'

import TextInput from '@/components/textInput/TextInput'
import Verifier from '@/components/verifier/Verifier'
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
  TextInputContainer,
  DisabledStyles,
  TagVerifier,
} from './InputDialog.style'

interface InputDialogProps {
  isVisible: boolean
  title: string
  text: string
  setText: (text: string) => void
  completeText: string
  onCancel: () => void
  onComplete: () => void
  isDisabled?: boolean
  placeholder?: string
  isValid: boolean
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
  isValid,
}: InputDialogProps) => {
  /**
   *
   */
  const handleComplete = () => {
    onComplete()
  }

  return (
    <Modal
      style={Css.modal}
      statusBarTranslucent={true}
      isVisible={isVisible}
    >
      <Container>
        <Title>{i18n.t(title)}</Title>
        <TextInputContainer>
          <TextInput
            value={text}
            placeholder={placeholder ?? ''}
            maxLength={20}
            onChangeText={setText}
            handleClear={() => setText('')}
          />
        </TextInputContainer>
        <TagVerifier>
          <Verifier
            isValid={isValid}
            text={'tagVerify'}
          />
        </TagVerifier>
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
