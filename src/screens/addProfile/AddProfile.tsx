import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { useRecoilValue } from 'recoil'

import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
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
  NicknameContainer,
  NicknameInputBox,
  SelectButton,
  disabledStyle,
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

  return (
    <ScrollView>
      <Container>
        <Heading>{i18n.t('setProfileAndNickName')}</Heading>
        <NicknameContainer>
          <BodyText>{i18n.t('nickName')}</BodyText>
          <NicknameInputBox>
            <TextInput
              placeholder={i18n.t('nicknamePlaceholder')}
              onChangeText={handleChangeNickname}
              maxLength={20}
              value={nickname}
            />
            <ClearButton
              onPress={() => setNickname('')}
              disabled={!nickname}
            >
              {/* TODO: 아이콘 연결 */}
              <Text style={!nickname && disabledStyle.clearButton}>X</Text>
            </ClearButton>
          </NicknameInputBox>
          <Verifier
            isValid={false}
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
        <SelectButton>
          <BoxButton
            textKey="complete"
            onPress={handleComplete}
            isDisabled={!isNicknameValid}
          />
        </SelectButton>
      </Container>
    </ScrollView>
  )
}

export default AddProfile
