import React from 'react'

import { Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useRecoilState } from 'recoil'

import { SelectArchivingState } from '@/state/upload/SelectArchivingState'

import { Container, Title } from './ArchivingModal.style'

interface ArchivingModalProps {
  onClose: () => void
  isVisible: boolean
}

/**
 *
 */
export const ArchivingModal = ({ onClose, isVisible }: ArchivingModalProps) => {
  const [, setSelectArchiving] = useRecoilState(SelectArchivingState)

  /**
   *
   */
  const handleClickArchiving = (value: string) => {
    setSelectArchiving(value)
  }

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
          <Title>아카이빙</Title>
          {/* 추후 데이터 가져오는 걸로 변경 */}
          <TouchableOpacity onPress={() => handleClickArchiving('디자인 39')}>
            <Text>디자인 39</Text>
          </TouchableOpacity>
        </Container>
      </Modal>
    </>
  )
}
