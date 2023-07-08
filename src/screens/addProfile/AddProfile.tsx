import React from 'react'

import { View } from 'react-native'
import { useRecoilValue } from 'recoil'

import { BoxButton } from '@/components/button/BoxButton'
import Profile from '@/components/profile/Profile'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { ProfileImageState } from '@/recoils/ProfileImageState'

import { BodyText, Container, Heading, SelectButton } from './AddProfile.style'

interface AddProfileProps {
  navigation: MainNavigationProp
}
/**
 * AddProfile
 */
const AddProfile = ({ navigation }: AddProfileProps) => {
  const profileImage = useRecoilValue(ProfileImageState)

  /**
   * 선택 완료 버튼 클릭 액션을 처리합니다.
   */
  const handleComplete = () => {
    navigation.navigate('BottomTab')
    // setIsInstalled(true)
  }

  return (
    <Container>
      <Heading>{i18n.t('setProfileAndNickName')}</Heading>
      <View>
        <BodyText>{i18n.t('profile')}</BodyText>
        <Profile />
      </View>
      <View>
        <BodyText>{i18n.t('nickName')}</BodyText>
        <View>{/* TODO: 닉네임 인풋박스 */}</View>
      </View>
      <SelectButton /*style={!profilePicture && disableStyle}*/>
        <BoxButton
          textKey="complete"
          onPress={handleComplete}
          isDisabled={!profileImage}
        />
      </SelectButton>
    </Container>
  )
}

export default AddProfile
