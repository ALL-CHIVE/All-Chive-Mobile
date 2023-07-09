import React from 'react'

import { login } from '@react-native-seoul/kakao-login'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container } from './Login.style'

interface LoginProps {
  navigation: MainNavigationProp
}

/**
 *
 */
export const Login = ({ navigation }: LoginProps) => {
  /**
   *
   */
  const signInWithKakao = async (): Promise<void> => {
    try {
      const data = await login()
      // console.log(JSON.stringify(data))
      // 서버로 data 전송 로직 추가

      // 추후 분기처리
      navigation.navigate('SelectSubject')
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <>
      <Container>
        <Text>always, all, archive</Text>
        <Text>All:chive</Text>
        <Text>{i18n.t('simpleLogin')}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Image source={require('@/assets/icon_apple_login.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('@/assets/icon_naver_login.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={signInWithKakao}>
            <Image source={require('@/assets/icon_kakao_login.png')} />
          </TouchableOpacity>
        </View>
      </Container>
    </>
  )
}
