import React, { useState } from 'react'

import { Text, TextInput, View } from 'react-native'
import { useRecoilValue } from 'recoil'

import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import Profile from '@/components/profile/Profile'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
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

interface AddProfileProps {
  navigation: MainNavigationProp
}
/**
 * AddProfile
 */
const AddProfile = ({ navigation }: AddProfileProps) => {
  const profileImage = useRecoilValue(ProfileImageState)
  const [nickname, setNickname] = useState('')

  /**
   * 선택 완료 버튼 클릭 액션을 처리합니다.
   */
  const handleComplete = () => {
    // TODO: 서버로 이미지, 닉네임 전달
    navigation.navigate('BottomTab')
  }

  /**
   * handleChangeNickname
   */
  const handleChangeNickname = (nickname: string) => {
    // TODO: nickname 조건 처리
    setNickname(nickname)
    // TODO: nickname 중복 체크
  }

  return (
    <Container>
      <Heading>{i18n.t('setProfileAndNickName')}</Heading>
      <View>
        <BodyText>{i18n.t('profile')}</BodyText>
        <Profile />
      </View>
      <NicknameContainer>
        <BodyText style={!profileImage && disabledStyle.text}>{i18n.t('nickName')}</BodyText>
        <NicknameInputBox style={!profileImage && disabledStyle.nicknameInputBox}>
          <TextInput
            editable={!!profileImage}
            placeholder={i18n.t('nicknamePlaceholder')}
            onChangeText={handleChangeNickname}
            value={nickname}
          />
          <ClearButton
            onPress={() => setNickname('')}
            disabled={!profileImage}
          >
            {/* TODO: 아이콘 연결 */}
            <Text style={!profileImage && disabledStyle.clearButton}>X</Text>
          </ClearButton>
        </NicknameInputBox>
      </NicknameContainer>
      <SelectButton>
        <BoxButton
          textKey="complete"
          onPress={handleComplete}
          isDisabled={!profileImage || !nickname}
        />
      </SelectButton>
    </Container>
  )
}

export default AddProfile
