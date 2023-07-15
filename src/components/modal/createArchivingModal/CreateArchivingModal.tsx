import React, { useState } from 'react'

import { Image } from 'react-native'
import Modal from 'react-native-modal'
import { useMutation } from 'react-query'

import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'

import {
  CloseButton,
  Condition,
  Container,
  ModalTitle,
  Styles,
  TextInput,
  Title,
} from './CreateArchivingModal.style'
import { postArchiving } from './apis/postArchiving'

interface CreateArchivingModalProps {
  onClose: () => void
  isVisible: boolean
}

/**
 *
 */
export const CreateArchivingModal = ({ onClose, isVisible }: CreateArchivingModalProps) => {
  const [name, setName] = useState('')
  const [nameFocus, setNameFocus] = useState(false)

  /**
   *
   */
  const { mutate } = useMutation(() =>
    postArchiving({
      title: name,
      imageUrl: '',
      category: '',
      publicStatus: false,
    })
  )

  /**
   *
   */
  const handleNameFocus = () => {
    setNameFocus(true)
  }

  /**
   *
   */
  const handleNameBlur = () => {
    setNameFocus(false)
  }

  /**
   *
   */
  const handleSubmit = () => {
    // mutate() & close modal
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
          <CloseButton onPress={onClose}>
            <Image source={defaultIcons.closeButton} />
          </CloseButton>
          <ModalTitle>아카이빙 추가</ModalTitle>
          <Title>아카이빙 이름</Title>
          <TextInput
            placeholder="한/영/특수문자 15자 이내로 입력하세요"
            value={name}
            onChangeText={setName}
            onFocus={handleNameFocus}
            onBlur={handleNameBlur}
            maxLength={15}
            style={[
              nameFocus ? Styles.inputFocus : null,
              !nameFocus && name.length > 0 ? Styles.inputWithValue : null,
            ]}
          />
          {/* TODO: Condition Icon 추가 */}
          <Condition style={[name.length > 0 ? Styles.conditionComplete : null]}>
            한/영/특수문자 15자 이내로 입력하세요
          </Condition>
          <BoxButton
            textKey="추가하기"
            onPress={handleSubmit}
            // isDisabled
          />
        </Container>
      </Modal>
    </>
  )
}
