import { appleAuth } from '@invertase/react-native-apple-authentication'
import { login } from '@react-native-seoul/kakao-login'

import { SignInType } from '@/models/enums/SignInType'

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
const signInWithApple = async (): Promise<void> => {
  try {
    const { user, fullName, email, identityToken } = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })

    const credentialState = await appleAuth.getCredentialStateForUser(user)

    console.log(credentialState)

    if (credentialState === appleAuth.State.AUTHORIZED) {
      const data = [user, fullName, email, identityToken, credentialState]
      console.log(JSON.stringify(data))
    }

    // 서버로 data 전송 로직 추가
  } catch (err) {
    // console.log(err)
  }
}

/**
 * signInWithKakao
 */
const signInWithKakao = async (): Promise<void> => {
  try {
    const data = await login()
    // console.log(JSON.stringify(data))
    // 서버로 data 전송 로직 추가
  } catch (err) {
    // console.log(err)
  }
}
