import React from 'react'

import { Image, Platform, Text, TouchableOpacity, View } from 'react-native'

import { loginIcons } from '@/assets'
import i18n from '@/locales'
import { SignInType } from '@/models/enums/SignInType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { signInWith } from '@/services/SignInService'

import { Container } from './Login.style'

interface LoginProps {
  navigation: MainNavigationProp
}

/**
 *
 */
export const Login = ({ navigation }: LoginProps) => {
  /**
   * 로그인을 처리합니다.
   */
  const signIn = async (type: SignInType) => {
    await signInWith(type)

    // TODO: 회원가입 체크 후 스크린 이동
    navigation.navigate('SelectCategory')
  }

  return (
    <>
      <Container>
        <Text>always, all, archive</Text>
        <Text>All:chive</Text>
        <Text>{i18n.t('simpleLogin')}</Text>
        <View style={{ flexDirection: 'row' }}>
          {Platform.select({
            ios: (
              <TouchableOpacity onPress={() => signIn(SignInType.Apple)}>
                <Image source={loginIcons.apple} />
              </TouchableOpacity>
            ),
          })}
          <TouchableOpacity onPress={() => signIn(SignInType.Kakao)}>
            <Image source={loginIcons.kakao} />
          </TouchableOpacity>
        </View>
      </Container>
    </>
  )
}
