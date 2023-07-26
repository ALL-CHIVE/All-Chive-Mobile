import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'

import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Footer, NavigationListContainer } from './Mypage.style'
import { NavigationList } from './components/NavigationList'

/**
 * 마이 페이지
 */
export const Mypage = () => {
  const navigation = useNavigation<MainNavigationProp>()

  useEffect(() => {
    navigation.setOptions({
      /**
       * LeftButtonHeader
       */
      header: () => <LeftButtonHeader title={i18n.t('mypage')} />,
    })
  })

  return (
    <>
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
