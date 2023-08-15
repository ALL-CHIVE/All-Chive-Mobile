import React, { useState } from 'react'

import { Image } from 'react-native'
import Modal from 'react-native-modal'

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

  /**
   * handleChangeNickname
   */
  const handleChangeNickname = (nickname: string) => {
    setNickname(nickname)
    setIsNicknameValid(checkNickname(nickname))
    // TODO: nickname 중복 체크
  }

  /**
   * handleClearNickname
   */
  const handleClearNickname = () => {
    setNickname('')
    setIsNicknameValid(false)
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
            disabled={!isNicknameValid}
          >
            <ButtonText style={isNicknameValid && Styles.buttonEnable}>
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
            {isNicknameValid ? (
              <Icon source={defaultIcons.check} />
            ) : (
              <Icon source={defaultIcons.grayCloseButton} />
            )}
            <Text>{i18n.t('nicknameVerify')}</Text>
          </VerifierContainer>
        </NicknameContainer>
      </Container>
    </Modal>
  )
}

export default NicknameEditModal
