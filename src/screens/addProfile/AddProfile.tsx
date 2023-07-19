import React, { useState } from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { Image, View } from 'react-native'
import { useRecoilValue } from 'recoil'

import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import Profile from '@/components/profile/Profile'
import Verifier from '@/components/verifier/Verifier'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { checkNickname } from '@/services/NicknameChecker'
import { signUp } from '@/services/SignInService'
import { setIsInstalled } from '@/services/localStorage/LocalStorage'
import { ProfileImageState } from '@/state/ProfileImageState'
import { IdTokenState } from '@/state/signIn/UserState'

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
  const [nickname, setNickname] = useState('')
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const navigation = useNavigation<MainNavigationProp>()
  const idToken = useRecoilValue(IdTokenState)

  /**
   * 선택 완료 버튼 클릭 액션을 처리합니다.
   */
  const handleComplete = async () => {
    //TODO: 이미지 파일 업로드
    const imageUrl = profileImage ? '' : ''

    const isSucess = await signUp(
      route.params.type,
      idToken,
      imageUrl,
      nickname,
      route.params.categories
    )

    if (isSucess) {
      setIsInstalled(true)
      navigation.navigate('BottomTab', { screen: 'Home' })
    }
  }

  // TODO: 닉네임 체크 500 error
  // const { data, isLoading } = useQuery(['nickname', nickname], () => checkNicknameValid(nickname))

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
                {/* TODO: 아이콘 연결 */}
                <Image source={defaultIcons.grayCloseButton} />
              </ClearButton>
            </NicknameInputBox>
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
        isDisabled={!isNicknameValid}
      />
    </DefaultContainer>
  )
}

export default AddProfile
