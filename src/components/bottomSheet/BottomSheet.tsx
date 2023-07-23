import React from 'react'

import Modal from 'react-native-modal'

import { Styles } from './BottomSheet.style'

interface BottomSheetProps {
  isVisible: boolean
  onBackdropPress: () => void
  onModalHide: () => void
  children: React.ReactNode
}

/**
 * BottomSheet
 */
const BottomSheet = ({ isVisible, onBackdropPress, onModalHide, children }: BottomSheetProps) => {
  return (
    <Modal
      isVisible={isVisible}
      style={Styles.modal}
      onBackdropPress={onBackdropPress}
      onModalHide={onModalHide}
    >
      {children}
    </Modal>
  )
}

export default BottomSheet
