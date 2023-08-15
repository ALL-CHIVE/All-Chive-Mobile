import React, { useState } from 'react'

import { Image } from 'react-native'
import Modal from 'react-native-modal'
import { useMutation } from 'react-query'

import { checkNicknameValid } from '@/apis/user'
import { defaultIcons } from '@/assets'
import i18n from '@/locales'
import { checkNickname } from '@/services/StringChecker'

import {
  Button,
  ButtonText,
  ClearButton,
  Container,
  Header,
  Icon,
  InputBox,
  NicknameContainer,
  NicknameInputBox,
  Styles,
  Text,
  Title,
  VerifierContainer,
} from './NicknameEditModal.style'

interface NicknameEditModalProps {
  isVisible: boolean
  onCancle: () => void
  onSuccess: (nickname: string) => void
}

/**
 *
 */
const NicknameEditModal = ({ isVisible, onCancle, onSuccess }: NicknameEditModalProps) => {
  const [nickname, setNickname] = useState('')
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false)

  const { mutate: nicknameDuplicationCheckMutate } = useMutation(checkNicknameValid, {
    /**
     *
     */
    onSuccess: () => {
      setIsNicknameDuplicate(true)
    },

    /**
     *
     */
    onError: () => {
      setIsNicknameDuplicate(false)
    },
  })

  /**
   * handleChangeNickname
   */
  const handleChangeNickname = (nickname: string) => {
    setNickname(nickname)
    setIsNicknameValid(checkNickname(nickname))
    if (nickname) {
      nicknameDuplicationCheckMutate(nickname)
    } else {
      setIsNicknameDuplicate(false)
    }
  }

  /**
   * handleClearNickname
   */
  const handleClearNickname = () => {
    setNickname('')
    setIsNicknameValid(false)
    setIsNicknameDuplicate(false)
  }

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.8}
      style={{
        alignItems: 'center',
      }}
    >
      <Container>
        <Header>
          <Button onPress={onCancle}>
            <ButtonText>{i18n.t('cancel')}</ButtonText>
          </Button>
          <Title>{i18n.t('nickName')}</Title>
          <Button
            onPress={() => onSuccess(nickname)}
            disabled={!isNicknameValid || !isNicknameDuplicate}
          >
            <ButtonText style={isNicknameValid && isNicknameDuplicate && Styles.buttonEnable}>
              {i18n.t('confirm')}
            </ButtonText>
          </Button>
        </Header>
        <NicknameContainer>
          <NicknameInputBox>
            <InputBox
              textAlign="center"
              onChangeText={handleChangeNickname}
              maxLength={20}
              value={nickname}
            />
            <ClearButton
              onPress={handleClearNickname}
              disabled={!nickname}
            >
              <Image source={defaultIcons.grayCloseButton} />
            </ClearButton>
          </NicknameInputBox>
          <VerifierContainer>
            <Text>{i18n.t('isNotDuplicate')}</Text>
          </VerifierContainer>
          <VerifierContainer>
            <Text>{i18n.t('nicknameVerify')}</Text>
          </VerifierContainer>
        </NicknameContainer>
      </Container>
    </Modal>
  )
}

export default NicknameEditModal
