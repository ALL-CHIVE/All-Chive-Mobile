import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, Platform } from 'react-native'
import { useQuery, useQueryClient } from 'react-query'
import { useSetRecoilState } from 'recoil'

import { loginIcons, logo } from '@/assets'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import { Loading } from '@/components/loading/Loading'
import i18n from '@/locales'
import { SignInType } from '@/models/enums/SignInType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { signInWith } from '@/services/SignInService'
import { setIsInstalled } from '@/services/localStorage/LocalStorage'
import { SignInState } from '@/state/signIn/SignInState'
import { IdTokenState } from '@/state/signIn/UserState'

import { Button, Container, LoginButtons, Logo, SubLogo, Title } from './Login.style'

/**
 * Login
 */
export const Login = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const setIdTokenState = useSetRecoilState(IdTokenState)
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
        // TODO: 이용약관 페이지 추가
        navigation.navigate('SelectCategory', { type })
      }
    },
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
          <SubLogo source={logo.allchiveSubLogo} />
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
                  <Image source={loginIcons.apple} />
                </Button>
              ),
            })}
            <Button
              onPress={() => {
                setEnabled(true)
                setType(SignInType.Kakao)
              }}
            >
              <Image source={loginIcons.kakao} />
            </Button>
          </LoginButtons>
        </Container>
      </DefaultContainer>
    </>
  )
}
