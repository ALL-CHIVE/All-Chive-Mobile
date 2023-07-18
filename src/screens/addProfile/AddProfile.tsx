import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
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
import { checkNickname } from '@/services/NicknameChecker'
import { ProfileImageState } from '@/state/ProfileImageState'

import {
  BodyText,
  ClearButton,
  Container,
  Heading,
  InputBox,
  NicknameContainer,
  NicknameInputBox,
} from './AddProfile.style'

/**
 * AddProfile
 */
const AddProfile = () => {
  const profileImage = useRecoilValue(ProfileImageState)
  const [nickname, setNickname] = useState('')
  const [isNicknameValid, setIsNicknameValid] = useState(false)
  const navigation = useNavigation<MainNavigationProp>()

  /**
   * 선택 완료 버튼 클릭 액션을 처리합니다.
   */
  const handleComplete = () => {
    // TODO: 서버로 이미지, 닉네임 전달
    navigation.navigate('BottomTab', { screen: 'Community' })
  }

  /**
   * handleChangeNickname
   */
  const handleChangeNickname = (nickname: string) => {
    // TODO: nickname 조건 처리
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
                <Image source={defaultIcons.closeButton} />
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
