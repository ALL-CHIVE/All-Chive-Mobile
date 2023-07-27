import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ImageURISource } from 'react-native'
import { useQuery } from 'react-query'

import { getUserInfo } from '@/apis/user'
import { defaultImages } from '@/assets'
import { Divider } from '@/components/divider/Divider'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import {
  InfoContainer,
  InfoText,
  InfoTitle,
  ProfileContainer,
  ProfileImage,
  InfoList,
} from './MyAccount.style'

/**
 *
 */
export const MyAccount = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const [editMode, setEditMode] = useState(false)
  const [isProfileImageError, setIsProfileImageError] = useState(false)

  const {
    data: userInfoData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(['getUserInfo'], () => getUserInfo())

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => (
        <LeftButtonHeader
          title={i18n.t('myAccount')}
          rightButtonText={editMode ? '완료' : i18n.t('edit')}
          rightButtonClick={() => setEditMode(!editMode)}
        />
      ),
    })
  })

  return (
    <>
      <ProfileContainer>
        <ProfileImage
          source={
            isProfileImageError || !userInfoData?.imgUrl
              ? defaultImages.profile
              : { uri: userInfoData?.imgUrl }
          }
          onError={() => setIsProfileImageError(true)}
          defaultSource={defaultImages.profile as ImageURISource}
        />
      </ProfileContainer>

      <InfoContainer>
        <InfoList>
          <InfoTitle>이름</InfoTitle>
          <InfoText>{userInfoData?.name}</InfoText>
        </InfoList>
        <Divider />
        <InfoList>
          <InfoTitle>이메일</InfoTitle>
          <InfoText>{userInfoData?.email}</InfoText>
        </InfoList>
        <Divider />
        <InfoList>
          <InfoTitle>닉네임</InfoTitle>
          <InfoText>{userInfoData?.nickname}</InfoText>
        </InfoList>
        <Divider />
      </InfoContainer>
    </>
  )
}
