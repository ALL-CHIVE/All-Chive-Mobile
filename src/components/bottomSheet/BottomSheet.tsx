import React from 'react'

import Modal from 'react-native-modal'

import { Styles } from './BottomSheet.style'

interface BottomSheetProps {
  isVisible: boolean
  onModalHide: () => void
  children: React.ReactNode
}

/**
 * BottomSheet
 */
const BottomSheet = ({ isVisible, onModalHide, children }: BottomSheetProps) => {
  return (
    <Modal
      isVisible={isVisible}
      style={Styles.modal}
      onModalHide={onModalHide}
    >
      {children}
    </Modal>
  )
}

export default BottomSheet
