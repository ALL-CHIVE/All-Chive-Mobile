import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ImageURISource, TouchableOpacity, View } from 'react-native'
import { getVersion } from 'react-native-device-info'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Shadow } from 'react-native-shadow-2'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { logout } from '@/apis/auth/Auth'
import { getUser } from '@/apis/user/User'
import { defaultImages } from '@/assets'
import LeftArrowIcon from '@/assets/icons/left-arrow.svg'
import CountCard from '@/components/cards/countCard/CountCard'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { InformationErrorDialog } from '@/components/dialogs/errorDialog/InformationErrorDialog/InformationErrorDialog'
import { Loading } from '@/components/loading/Loading'
import { community, customerService, openSourceLicense, privacy, terms } from '@/const/Const'
import useUserInfo from '@/hooks/useUserInfo'
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
  CountContainer,
} from './Mypage.style'
import { NavigationList } from './components/NavigationList'

/**
 * 마이 페이지
 */
export const Mypage = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()
  const version = getVersion()

  const [isProfileImageError, setIsProfileImageError] = useState(false)
  const [errorDialogVisible, setErrorDialogVisible] = useState(false)
  const { clearUserInfo } = useUserInfo()

  const { data: profileData, isLoading: isProfileLoading } = useQuery(['getUser'], () => getUser())

  const { mutate: logoutMutate } = useMutation(logout, {
    /**
     *
     */
    onSuccess: () => {
      clearUserInfo()
      navigation.reset({ routes: [{ name: 'Login' }] })
      queryClient.clear()
    },
    /**
     *
     */
    onError: () => {
      setErrorDialogVisible(true)
    },
  })

  /**
   *
   */
  const handleLogout = () => {
    logoutMutate()
  }

  const { top } = useSafeAreaInsets()
  return (
    <>
      {isProfileLoading && <Loading />}
      <InformationErrorDialog
        isVisible={errorDialogVisible}
        onRetry={() => {
          setErrorDialogVisible(false)
          queryClient.invalidateQueries(['getUser'])
        }}
        onClick={() => {
          setErrorDialogVisible(false)
        }}
      />
      <View style={{ backgroundColor: colors.yellow200, height: top }} />
      <DefaultContainer>
        <ScrollContainer
          bounces={false}
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
              <HeaderContainer>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <LeftArrowIcon />
                </TouchableOpacity>
                <Title>{i18n.t('mypage')}</Title>
                <View style={{ width: 20 }} />
              </HeaderContainer>
              <ProfileContainer>
                <ProfileImage
                  source={
                    isProfileImageError || !profileData?.imgUrl
                      ? defaultImages.profile
                      : { uri: profileData.imgUrl }
                  }
                  onError={() => setIsProfileImageError(true)}
                  defaultSource={defaultImages.profile as ImageURISource}
                />
                <NicknameText>{profileData?.nickname}</NicknameText>
                <CountContainer>
                  <CountCard
                    title={i18n.t('link')}
                    count={profileData?.linkCount ?? 0}
                  />
                  <CountCard
                    title={i18n.t('image')}
                    count={profileData?.imgCount ?? 0}
                  />
                  <CountCard
                    title={i18n.t('publicArchiving')}
                    count={profileData?.publicArchivingCount ?? 0}
                  />
                </CountContainer>
              </ProfileContainer>
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
              title={i18n.t('openSourceLicense')}
              openInAppUrl={openSourceLicense}
            />
            <NavigationList
              title={i18n.t('customerService')}
              openInAppUrl={customerService}
            />
            <NavigationList
              title={i18n.t('recycleBin')}
              screen="RecycleBin"
            />
          </NavigationListContainer>
          <Footer>
            <FooterText>{`${i18n.t('appVersion')} ${version}`}</FooterText>
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
