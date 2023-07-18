import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, Platform } from 'react-native'
import { useSetRecoilState } from 'recoil'

import { loginIcons, logo } from '@/assets'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import i18n from '@/locales'
import { SignInType } from '@/models/enums/SignInType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { signInWith } from '@/services/SignInService'
import { TokenState } from '@/state/UserState'
import { IdTokenState } from '@/state/UserState'

import { Button, Container, LoginButtons, Logo, SubLogo, Title } from './Login.style'

/**
 * Login
 */
export const Login = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const setTokenState = useSetRecoilState(TokenState)
  const setIdTokenState = useSetRecoilState(IdTokenState)

  /**
   * 로그인을 처리합니다.
   */
  const signIn = async (type: SignInType) => {
    const signInResult = await signInWith(type)

    if (!signInResult) {
      return
    }

    if (signInResult.canLogin && signInResult.accessToken) {
      setTokenState(signInResult.accessToken)
      navigation.navigate('BottomTab', { screen: 'Home' })
    } else if (!signInResult.canLogin && signInResult.idToken) {
      setIdTokenState(signInResult.idToken)
      // TODO: 이용약관 페이지 추가
      navigation.navigate('SelectCategory')
    }
  }

  return (
    <DefaultContainer>
      <Container>
        <SubLogo source={logo.allchiveSubLogo} />
        <Logo source={logo.allchiveLogo} />
        <Title>{i18n.t('simpleLogin')}</Title>
        <LoginButtons>
          {Platform.select({
            ios: (
              <Button onPress={() => signIn(SignInType.Apple)}>
                <Image source={loginIcons.apple} />
              </Button>
            ),
          })}
          <Button onPress={() => signIn(SignInType.Kakao)}>
            <Image source={loginIcons.kakao} />
          </Button>
        </LoginButtons>
      </Container>
    </DefaultContainer>
  )
}
