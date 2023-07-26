import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, ImageURISource, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useQuery } from 'react-query'

import { getUser } from '@/apis/user'
import { defaultIcons, defaultImages } from '@/assets'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { colors } from '@/styles/colors'

import { ProfileImage } from '../main/Main.style'

import {
  Container,
  Footer,
  HeaderContainer,
  NavigationListContainer,
  ProfileContainer,
  Title,
} from './Mypage.style'
import { NavigationList } from './components/NavigationList'

/**
 * 마이 페이지
 */
export const Mypage = () => {
  const navigation = useNavigation<MainNavigationProp>()

  const [isProfileImageError, setIsProfileImageError] = useState(false)

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(['getUser'], () => getUser())

  return (
    <>
      <Container>
        <LinearGradient
          style={{ height: '100%' }}
          colors={[colors.white, colors.yellow600]}
        >
          <HeaderContainer>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={defaultIcons.back} />
            </TouchableOpacity>
            <Title>{i18n.t('mypage')}</Title>
          </HeaderContainer>

          <ProfileContainer>
            <ProfileImage
              source={
                isProfileImageError || !profileData?.imgUrl
                  ? defaultImages.profile
                  : { uri: profileData?.imgUrl }
              }
              onError={() => setIsProfileImageError(true)}
              defaultSource={defaultImages.profile as ImageURISource}
            />
          </ProfileContainer>
        </LinearGradient>
      </Container>

      <NavigationListContainer>
        <NavigationList
          title={i18n.t('myAccount')}
          screen="MyAccount"
        />
        <NavigationList
          title={i18n.t('archivingManagement')}
          screen="ArchivingManagement"
        />
        <NavigationList
          title={i18n.t('tagManagement')}
          screen="TagManagement"
        />
        <NavigationList
          title={i18n.t('blockManagement')}
          screen="BlockManagement"
        />
        <NavigationList
          title={i18n.t('termsOfService')}
          screen="TermsOfService"
        />
        <NavigationList
          title={i18n.t('communityUsePolicy')}
          screen="CommunityUsePolicy"
        />
        <NavigationList
          title={i18n.t('recycleBin')}
          screen="RecycleBin"
        />
      </NavigationListContainer>
      <Footer />
    </>
  )
}
