import React from 'react'

import { SafeAreaView } from 'react-native'
import Modal from 'react-native-modal'

import XMark from '@/assets/icons/x-mark.svg'
import useNicknameCheck from '@/hooks/useNicknameCheck'
import i18n from '@/locales'
import { colors } from '@/styles/colors'

import {
  Button,
  ButtonText,
  ClearButton,
  Container,
  Header,
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
  const {
    nickname,
    isNicknameValid,
    isNicknameDuplicate,
    handleChangeNickname,
    handleClearNickname,
  } = useNicknameCheck()

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.8}
      style={Styles.modal}
    >
      <SafeAreaView>
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
          <NicknameContainer bounces={false}>
            <NicknameInputBox>
              <InputBox
                textAlign="center"
                onChangeText={handleChangeNickname}
                maxLength={10}
                value={nickname}
              />
              <ClearButton
                onPress={handleClearNickname}
                disabled={!nickname}
              >
                <XMark color={colors.gray600} />
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
      </SafeAreaView>
    </Modal>
  )
}

export default NicknameEditModal
