import { appleAuth } from '@invertase/react-native-apple-authentication'
import { login } from '@react-native-seoul/kakao-login'

import { postIdTokenLogin, signUpUser } from '@/apis/oauth'
import { SignInResult } from '@/models/SignInResult'
import { SignInType } from '@/models/enums/SignInType'

import { setAccessToken, setRefreshToken } from './localStorage/LocalStorage'

/**
 * 로그인을 진행합니다.
 */
export const signInWith = (type: SignInType) => {
  switch (type) {
    case SignInType.Kakao:
      return signInWithKakao()
    case SignInType.Apple:
      return signInWithApple()
  }
}

/**
 * signInWithApple
 */
const signInWithApple = async (): Promise<SignInResult | undefined> => {
  try {
    const { user, fullName, email, identityToken } = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })

    const credentialState = await appleAuth.getCredentialStateForUser(user)

    // console.log(credentialState)

    if (credentialState === appleAuth.State.AUTHORIZED && identityToken) {
      const data = [user, fullName, email, identityToken, credentialState]
      console.log(JSON.stringify(data))
      return getIsUser(SignInType.Apple, identityToken)
    }

    return
    // 서버로 data 전송 로직 추가
  } catch (err) {
    // console.log(err)

    return
  }
}

/**
 * signInWithKakao
 */
const signInWithKakao = async (): Promise<SignInResult | undefined> => {
  try {
    const data = await login()

    if (data) {
      return getIsUser(SignInType.Kakao, data['idToken'])
    }

    return
  } catch (err) {
    //ignore
    return
  }
}

/**
 * 유저인지 확인합니다.
 */
const getIsUser = async (type: string, idToken: string): Promise<SignInResult | undefined> => {
  try {
    const response = await postIdTokenLogin(type, idToken)

    if (!response?.data?.data) {
      return
    } else if (!response.data.data['canLogin']) {
      return {
        canLogin: false,
        idToken,
      }
    } else {
      saveTokens(response.data.data['refreshToken'], response.data.data['accessToken'])
      return {
        canLogin: true,
      }
    }
  } catch (err) {
    //ignore
    return
  }
}

/**
 * 가입합니다.
 */
export const signUp = async (
  provider: SignInType,
  idToken: string,
  profileImgUrl: string,
  nickname: string,
  categories: string[]
) => {
  try {
    const response = await signUpUser(provider, idToken, profileImgUrl, nickname, categories)

    if (!response?.data?.data) {
      return false
    } else {
      saveTokens(response.data.data['refreshToken'], response.data.data['accessToken'])
      return true
    }
  } catch (err) {
    //ignore
    console.log(err.message)
    return false
  }
}

/**
 * saveTokens
 */
const saveTokens = (refreshToken: string, accessToken: string) => {
  setRefreshToken(refreshToken)
  setAccessToken(accessToken)
}
