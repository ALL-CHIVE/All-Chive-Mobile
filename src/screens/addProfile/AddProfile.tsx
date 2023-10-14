import React from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'

import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import Indicator from '@/components/indicator/Indicator'
import TextInput from '@/components/textInput/TextInput'
import Verifier from '@/components/verifier/Verifier'
import useNicknameCheck from '@/hooks/useNicknameCheck'
import useUserInfo from '@/hooks/useUserInfo'
import i18n from '@/locales'
import { SignInType } from '@/models/enums/SignInType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStackParamList'
import { signUp } from '@/services/SignInService'
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
  const navigation = useNavigation<MainNavigationProp>()
  const { idToken, thirdpartyAccessToken, signInType, name, email } = useUserInfo()

  const {
    nickname,
    isNicknameValid,
    isNicknameDuplicate,
    handleChangeNickname,
    handleClearNickname,
  } = useNicknameCheck()

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
       * onSuccess
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

  return (
    <>
      {isLoading && <Indicator />}
      <DefaultContainer>
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
    </>
  )
}

export default AddProfile
