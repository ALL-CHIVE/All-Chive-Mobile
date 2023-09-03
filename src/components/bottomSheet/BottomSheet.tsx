import React from 'react'

import Modal from 'react-native-modal'

import { deviceHeight } from '@/services/SizeService'

import { Styles } from './BottomSheet.style'

interface BottomSheetProps {
  isVisible: boolean
  onClose: () => void
  onModalHide: () => void
  children: React.ReactNode
}

/**
 * BottomSheet
 */
const BottomSheet = ({ isVisible, onClose, onModalHide, children }: BottomSheetProps) => {
  return (
    <Modal
      isVisible={isVisible}
      style={Styles.modal}
      onBackdropPress={onClose}
      onModalHide={onModalHide}
      statusBarTranslucent={true}
      backdropOpacity={0.5}
      deviceHeight={deviceHeight}
    >
      {children}
    </Modal>
  )
}

export default BottomSheet
