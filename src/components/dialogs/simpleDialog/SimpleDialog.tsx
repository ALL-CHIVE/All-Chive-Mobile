import React from 'react'

import Modal from 'react-native-modal'

import DialogButton from '@/components/buttons/dialogButton/DialogButton'
import i18n from '@/locales'
import { colors } from '@/styles/colors'

import { Container, Styles, Title } from './SimpleDialog.style'

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
      statusBarTranslucent={true}
      onModalHide={onClose}
    >
      <Container>
        <Title>{i18n.t(title)}</Title>
        <DialogButton
          title={completeText}
          onPress={onClose}
          color={colors.white}
          backgroundColor={colors.gray500}
        />
      </Container>
    </Modal>
  )
}
