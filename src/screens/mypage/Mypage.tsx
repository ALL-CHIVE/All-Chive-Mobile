import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, ImageURISource, TouchableOpacity } from 'react-native'
import Config from 'react-native-config'
import LinearGradient from 'react-native-linear-gradient'
import { Shadow } from 'react-native-shadow-2'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { logout } from '@/apis/auth'
import { getUser } from '@/apis/user'
import { defaultIcons, defaultImages } from '@/assets'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import { Loading } from '@/components/loading/Loading'
import { community, customerService, privacy, terms } from '@/const/Const'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { colors } from '@/styles/colors'

import {
  MyPageContainer,
  Footer,
  FooterText,
  HeaderContainer,
  NavigationListContainer,
  NicknameText,
  ProfileContainer,
  ProfileImage,
  Title,
  ScrollContainer,
} from './Mypage.style'
import { NavigationList } from './components/NavigationList'

/**
 * 마이 페이지
 */
export const Mypage = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const [isProfileImageError, setIsProfileImageError] = useState(false)

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(['getUser'], () => getUser())

  const { mutate: logoutMutate } = useMutation(logout, {
    /**
     *
     */
    onSuccess: () => {
      navigation.navigate('Login')
    },
  })

  /**
   *
   */
  const handleLogout = () => {
    logoutMutate()
  }

  return (
    <>
      {isProfileLoading && <Loading />}
      <ErrorDialog
        isVisible={isProfileError}
        onClick={() => {
          queryClient.invalidateQueries(['getUser'])
        }}
      />
      <DefaultContainer>
        <ScrollContainer
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Shadow
            startColor={colors.gray50}
            offset={[0, 1]}
            sides={{ start: false, end: false, top: false, bottom: true }}
            distance={4}
            style={{ width: '100%', borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
          >
            <MyPageContainer>
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
                        : { uri: `${Config.ALLCHIVE_ASSET_SERVER}/${profileData.imgUrl}` }
                    }
                    onError={() => setIsProfileImageError(true)}
                    defaultSource={defaultImages.profile as ImageURISource}
                  />
                  <NicknameText>{profileData?.nickname}</NicknameText>
                </ProfileContainer>
              </LinearGradient>
            </MyPageContainer>
          </Shadow>
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
              openInAppUrl={terms}
            />
            <NavigationList
              title={i18n.t('privacyPolicy')}
              openInAppUrl={privacy}
            />
            <NavigationList
              title={i18n.t('communityUsePolicy')}
              openInAppUrl={community}
            />
            <NavigationList
              title={i18n.t('notice')}
              screen="Notice"
            />
            <NavigationList
              title={i18n.t('customerService')}
              url={customerService}
            />
            <NavigationList
              title={i18n.t('recycleBin')}
              screen="RecycleBin"
            />
          </NavigationListContainer>
          <Footer>
            <FooterText>{i18n.t('appVersion')}</FooterText>
            <FooterText>{`   |   `}</FooterText>
            <TouchableOpacity onPress={handleLogout}>
              <FooterText>{i18n.t('logout')}</FooterText>
            </TouchableOpacity>
          </Footer>
        </ScrollContainer>
      </DefaultContainer>
    </>
  )
}
