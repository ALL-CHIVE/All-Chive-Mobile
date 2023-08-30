import React, { useState } from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'

import { checkNicknameValid } from '@/apis/user/User'
import XMark from '@/assets/icons/x-mark.svg'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import Indicator from '@/components/indicator/Indicator'
import Verifier from '@/components/verifier/Verifier'
import useUserInfo from '@/hooks/useUserInfo'
import i18n from '@/locales'
import { SignInType } from '@/models/enums/SignInType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { signUp } from '@/services/SignInService'
import { checkNickname } from '@/services/StringChecker'
import { setIsInstalled } from '@/services/localStorage/LocalStorage'
import { colors } from '@/styles/colors'

import {
  BodyText,
  ClearButton,
  Container,
  Heading,
  InputBox,
  NicknameContainer,
  NicknameInputBox,
} from './AddProfile.style'

interface AddProfileProps {
  route: RouteProp<RootStackParamList, 'AddProfile'>
}

/**
 * AddProfile
 */
const AddProfile = ({ route }: AddProfileProps) => {
  const [nickname, setNickname] = useState('')
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false)
  const navigation = useNavigation<MainNavigationProp>()
  const { idToken, thirdpartyAccessToken, signInType, name, email } = useUserInfo()

  const { mutate: signUpMutate, isLoading } = useMutation(
    (signInType: SignInType) =>
      signUp(
        signInType,
        idToken,
        thirdpartyAccessToken,
        '',
        nickname,
        route.params.categories,
        route.params.marketingAgreement,
        name,
        email
      ),
    {
      /**
       *
       */
      onSuccess: () => {
        setIsInstalled(true)
        navigation.navigate('BottomTab', { screen: 'Home' })
      },
    }
  )

  /**
   * 선택 완료 버튼 클릭 액션을 처리합니다.
   */
  const handleComplete = async () => {
    if (!signInType) {
      return
    }

    signUpMutate(signInType)
  }

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
    <DefaultContainer>
      {isLoading && <Indicator />}
      <DefaultScrollContainer>
        <Container>
          <Heading>{i18n.t('pleaseSetProfile')}</Heading>
          <NicknameContainer>
            <BodyText>{i18n.t('nickName')}</BodyText>
            <NicknameInputBox>
              <InputBox
                placeholder={i18n.t('nicknamePlaceholder')}
                placeholderTextColor={colors.gray200}
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
            <Verifier
              isValid={isNicknameDuplicate}
              text={'isNotDuplicate'}
            />
            <Verifier
              isValid={isNicknameValid}
              text={'nicknameVerify'}
            />
          </NicknameContainer>
        </Container>
      </DefaultScrollContainer>
      <BoxButton
        textKey={i18n.t('startAllChive')}
        onPress={handleComplete}
        isDisabled={!isNicknameValid || !isNicknameDuplicate}
      />
    </DefaultContainer>
  )
}

export default AddProfile
