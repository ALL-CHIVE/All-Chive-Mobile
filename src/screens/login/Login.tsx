import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Platform } from 'react-native'
import { useQuery, useQueryClient } from 'react-query'
import { useSetRecoilState } from 'recoil'

import { logo } from '@/assets'
import AppleLogo from '@/assets/login/apple.svg'
import KakaoLogo from '@/assets/login/kakao.svg'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import { Loading } from '@/components/loading/Loading'
import i18n from '@/locales'
import { SignInType } from '@/models/enums/SignInType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { signInWith } from '@/services/SignInService'
import { setIsInstalled } from '@/services/localStorage/LocalStorage'
import { SignInState } from '@/state/signIn/SignInState'
import { IdTokenState, ThirdpartyAccessTokenState } from '@/state/signIn/UserState'

import { Button, Container, LoginButtons, Logo, SubLogo, Title } from './Login.style'

/**
 * Login
 */
export const Login = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const setIdTokenState = useSetRecoilState(IdTokenState)
  const setThirdpartyAccessTokenState = useSetRecoilState(ThirdpartyAccessTokenState)
  const IsSignInState = useSetRecoilState(SignInState)

  const [type, setType] = useState<SignInType>(SignInType.Kakao)
  const [enabled, setEnabled] = useState(false)

  const { data, isLoading, isError } = useQuery(['signIn', type], () => signInWith(type), {
    enabled: enabled,
    /**
     * 로그인 성공 시
     */
    onSuccess: (data) => {
      setEnabled(false)

      if (!data) {
        return
      }
      if (data.canLogin) {
        IsSignInState(true)
        setIsInstalled(true)
        navigation.navigate('BottomTab', { screen: 'Home' })
      } else if (!data.canLogin && data.idToken) {
        setIdTokenState(data.idToken)
        setThirdpartyAccessTokenState(data.accessToken ?? '')
        navigation.navigate('Agreement', { type })
      }
    },
    retry: 0,
  })

  return (
    <>
      {isLoading && <Loading />}
      <ErrorDialog
        isVisible={isError}
        onClick={() => {
          queryClient.invalidateQueries(['signIn', type])
        }}
      />

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
                    setEnabled(true)
                    setType(SignInType.Apple)
                  }}
                >
                  <AppleLogo />
                </Button>
              ),
            })}
            <Button
              onPress={() => {
                setEnabled(true)
                setType(SignInType.Kakao)
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
