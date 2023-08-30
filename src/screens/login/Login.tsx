import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Platform } from 'react-native'
import { useMutation } from 'react-query'

import { logo } from '@/assets'
import AppleLogo from '@/assets/login/apple.svg'
import KakaoLogo from '@/assets/login/kakao.svg'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { Loading } from '@/components/loading/Loading'
import useUserInfo from '@/hooks/useUserInfo'
import i18n from '@/locales'
import { SignInType } from '@/models/enums/SignInType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { signInWith } from '@/services/SignInService'
import { setIsInstalled } from '@/services/localStorage/LocalStorage'

import { Button, Container, LoginButtons, Logo, SubLogo, Title } from './Login.style'

/**
 * Login
 */
export const Login = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const { updateUserInfo } = useUserInfo()

  const { mutate: signInMutate, isLoading } = useMutation(signInWith, {
    /**
     * 로그인 성공 시
     */
    onSuccess: (data) => {
      updateUserInfo(data)

      if (data.canLogin) {
        setIsInstalled(true)
        navigation.navigate('BottomTab', { screen: 'Home' })
      } else if (!data.canLogin && data.idToken) {
        navigation.navigate('Agreement')
      }
    },
    /**
     *
     */
    onError: () => {
      //ignore
    },
    retry: 0,
  })

  return (
    <>
      {isLoading && <Loading />}
      <DefaultContainer>
        <Container>
          <SubLogo>always, all, archive</SubLogo>
          <Logo source={logo.allchiveLogo} />
          <Title>{i18n.t('simpleLogin')}</Title>
          <LoginButtons>
            {Platform.select({
              ios: (
                <Button
                  onPress={() => {
                    signInMutate(SignInType.Apple)
                  }}
                >
                  <AppleLogo />
                </Button>
              ),
            })}
            <Button
              onPress={() => {
                signInMutate(SignInType.Kakao)
              }}
            >
              <KakaoLogo />
            </Button>
          </LoginButtons>
        </Container>
      </DefaultContainer>
    </>
  )
}
