import React, { useState } from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { Image, ImageURISource, View } from 'react-native'
import { useMutation } from 'react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { checkNicknameValid } from '@/apis/user'
import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import Profile from '@/components/profile/Profile'
import Verifier from '@/components/verifier/Verifier'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { uploadProfileImage } from '@/services/ImageService'
import { signUp } from '@/services/SignInService'
import { checkNickname } from '@/services/StringChecker'
import { setIsInstalled } from '@/services/localStorage/LocalStorage'
import { ProfileImageState } from '@/state/ProfileImageState'
import { SignInState } from '@/state/signIn/SignInState'
import { IdTokenState, ThirdpartyAccessTokenState } from '@/state/signIn/UserState'

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
  const profileImage = useRecoilValue(ProfileImageState)
  const setIsSignIn = useSetRecoilState(SignInState)
  const [nickname, setNickname] = useState('')
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false)
  const navigation = useNavigation<MainNavigationProp>()
  const idToken = useRecoilValue(IdTokenState)
  const ThirdpartyAccessToken = useRecoilValue(ThirdpartyAccessTokenState)

  /**
   * 선택 완료 버튼 클릭 액션을 처리합니다.
   */
  const handleComplete = async () => {
    const imageUrl = (profileImage as ImageURISource)?.uri ?? ''

    const profileImageUrl = await uploadProfileImage(imageUrl)

    const isSucess = await signUp(
      route.params.type,
      idToken,
      ThirdpartyAccessToken,
      profileImageUrl,
      nickname,
      route.params.categories
    )

    if (isSucess) {
      setIsInstalled(true)
      setIsSignIn(true)
      navigation.navigate('BottomTab', { screen: 'Home' })
    }
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
      <DefaultScrollContainer>
        <Container>
          <Heading>{i18n.t('pleaseSetProfile')}</Heading>
          <NicknameContainer>
            <BodyText>{i18n.t('nickName')}</BodyText>
            <NicknameInputBox>
              <InputBox
                placeholder={i18n.t('nicknamePlaceholder')}
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
            <Verifier
              isValid={isNicknameDuplicate}
              text={'isNotDuplicate'}
            />
            <Verifier
              isValid={isNicknameValid}
              text={'nicknameVerify'}
            />
          </NicknameContainer>
          <View>
            <BodyText>{i18n.t('profile')}</BodyText>
            <Profile />
          </View>
        </Container>
      </DefaultScrollContainer>
      <BoxButton
        textKey="complete"
        onPress={handleComplete}
        isDisabled={!isNicknameValid || !isNicknameDuplicate}
      />
    </DefaultContainer>
  )
}

export default AddProfile
