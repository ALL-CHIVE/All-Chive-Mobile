import React from 'react'

import { Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

import { Container } from './ArchivingModal.style'

interface ArchivingModalProps {
  onClose: () => void
  isVisible: boolean
}

/**
 *
 */
export const ArchivingModal = ({ onClose, isVisible }: ArchivingModalProps) => {
  return (
    <>
      <Modal
        isVisible={isVisible}
        // backdropOpacity={0.5}
        style={{
          margin: 0,
        }}
      >
        <Container>
          <Text>ArchivingModal</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Container>
      </Modal>
    </>
  )
}
