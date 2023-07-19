import React from 'react'

import Modal from 'react-native-modal'

import i18n from '@/locales'

import { Button, ButtonText, Container, Styles, Title } from './SimpleDialog.style'

interface SimpleDialogProps {
  isVisible: boolean
  title: string
  completeText: string
  onClose: () => void
}

/**
 * title과 confirm button만 존재하는 Dialog
 */
export const SimpleDialog = ({ isVisible, title, completeText, onClose }: SimpleDialogProps) => {
  return (
    <Modal
      style={Styles.modal}
      isVisible={isVisible}
      onModalHide={onClose}
    >
      <Container>
        <Title>{i18n.t(title)}</Title>
        <Button onPress={onClose}>
          <ButtonText>{i18n.t(completeText)}</ButtonText>
        </Button>
      </Container>
    </Modal>
  )
}
