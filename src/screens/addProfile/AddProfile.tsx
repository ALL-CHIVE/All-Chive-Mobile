import React, { useState } from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'

import { checkNicknameValid } from '@/apis/user/User'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import Indicator from '@/components/indicator/Indicator'
import TextInput from '@/components/textInput/TextInput'
import Verifier from '@/components/verifier/Verifier'
import useText from '@/hooks/useText'
import useUserInfo from '@/hooks/useUserInfo'
import i18n from '@/locales'
import { SignInType } from '@/models/enums/SignInType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { signUp } from '@/services/SignInService'
import { checkNickname } from '@/services/StringChecker'
import { setIsInstalled } from '@/services/localStorage/LocalStorage'

import {
  BodyText,
  Container,
  Heading,
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
  const {
    text: nickname,
    isValid: isNicknameValid,
    updateText: updateNickname,
    clearText: clearNickname,
  } = useText(checkNickname)
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
        navigation.reset({ routes: [{ name: 'BottomTab', params: { screen: 'Home' } }] })
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
    updateNickname(nickname)

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
    clearNickname()
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
              <TextInput
                value={nickname}
                placeholder={i18n.t('nicknamePlaceholder')}
                maxLength={10}
                onChangeText={handleChangeNickname}
                handleClear={handleClearNickname}
              />
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
