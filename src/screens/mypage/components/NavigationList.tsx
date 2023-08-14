import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, Linking } from 'react-native'

import { defaultIcons } from '@/assets'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, Title } from './NavigationList.style'

interface NavigationListProps {
  title: string
  url?: string
  screen?:
    | 'MyAccount'
    | 'ArchivingManagement'
    | 'TagManagement'
    | 'BlockManagement'
    | 'TermsOfService'
    | 'CommunityUsePolicy'
    | 'Notice'
    | 'RecycleBin'
}

/**
 * 마이페이지에서 네비게이션 역할을 하는 리스트
 */
export const NavigationList = ({ title, screen, url }: NavigationListProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  return (
    <>
      {screen && (
        <>
          <Container onPress={() => navigation.navigate(screen)}>
            <Title>{title}</Title>
            <Image source={defaultIcons.rightButton} />
          </Container>
        </>
      )}
      {url && (
        <>
          <Container
            onPress={() => {
              Linking.openURL(url)
            }}
          >
            <Title>{title}</Title>
            <Image source={defaultIcons.rightButton} />
          </Container>
        </>
      )}
    </>
  )
}
