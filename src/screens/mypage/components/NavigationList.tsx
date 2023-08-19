import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Linking } from 'react-native'

import RightArrowIcon from '@/assets/icons/right_arrow.svg'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { openInappBrowser } from '@/services/InappBrowser'
import { colors } from '@/styles/colors'

import { Container, Title } from './NavigationList.style'

interface NavigationListProps {
  title: string
  url?: string
  openInAppUrl?: string
  screen?:
    | 'MyAccount'
    | 'ArchivingManagement'
    | 'TagManagement'
    | 'BlockManagement'
    | 'Notice'
    | 'RecycleBin'
}

/**
 * 마이페이지에서 네비게이션 역할을 하는 리스트
 */
export const NavigationList = ({ title, screen, url, openInAppUrl }: NavigationListProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  return (
    <>
      {screen && (
        <>
          <Container onPress={() => navigation.navigate(screen)}>
            <Title>{title}</Title>
            <RightArrowIcon color={colors.gray500} />
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
            <RightArrowIcon color={colors.gray500} />
          </Container>
        </>
      )}
      {openInAppUrl && (
        <>
          <Container
            onPress={() => {
              openInappBrowser(openInAppUrl)
            }}
          >
            <Title>{title}</Title>
            <RightArrowIcon color={colors.gray500} />
          </Container>
        </>
      )}
    </>
  )
}
