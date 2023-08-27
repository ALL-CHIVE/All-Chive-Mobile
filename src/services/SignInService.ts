import { appleAuth } from '@invertase/react-native-apple-authentication'
import { login } from '@react-native-seoul/kakao-login'

import { postIdTokenLogin, signUpUser } from '@/apis/auth/OAuth'
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
    const { user, identityToken } = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })

    const credentialState = await appleAuth.getCredentialStateForUser(user)

    if (credentialState === appleAuth.State.AUTHORIZED && identityToken) {
      return getIsUser(SignInType.Apple, identityToken, '')
    }

    return
  } catch (err) {
    return
  }
}

/**
 * 애플 AuthCode를 반환합니다.
 */
export const getAppleAuthCode = async () => {
  try {
    const { authorizationCode } = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.REFRESH,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })

    return authorizationCode ?? ''
  } catch (err) {
    return ''
  }
}

/**
 * signInWithKakao
 */
const signInWithKakao = async (): Promise<SignInResult | undefined> => {
  try {
    const data = await login()

    if (data) {
      return getIsUser(SignInType.Kakao, data['idToken'], data['accessToken'])
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
const getIsUser = async (
  type: string,
  idToken: string,
  accessToken: string
): Promise<SignInResult | undefined> => {
  try {
    const response = await postIdTokenLogin(type, idToken)

    if (!response?.data?.data) {
      return
    } else if (!response.data.data['canLogin']) {
      return {
        canLogin: false,
        idToken,
        accessToken,
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
  accessToken: string,
  profileImgUrl: string,
  nickname: string,
  categories: string[],
  marketingAgreement: boolean
) => {
  try {
    const response = await signUpUser(
      provider,
      idToken,
      accessToken,
      profileImgUrl,
      nickname,
      categories,
      marketingAgreement
    )

    if (!response?.data?.data) {
      return false
    } else {
      saveTokens(response.data.data['refreshToken'], response.data.data['accessToken'])
      return true
    }
  } catch (err) {
    //ignore
    return false
  }
}

/**
 * saveTokens
 */
export const saveTokens = (refreshToken: string, accessToken: string) => {
  setRefreshToken(refreshToken)
  setAccessToken(accessToken)
}
