import { useRecoilState } from 'recoil'

import { SignInResult } from '@/models/SignInResult'
import {
  EmailState,
  IdTokenState,
  NameState,
  SignInTypeState,
  ThirdpartyAccessTokenState,
} from '@/state/signIn/UserState'

/**
 *
 */
const useUserInfo = () => {
  const [idToken, setIdToken] = useRecoilState(IdTokenState)
  const [thirdpartyAccessToken, setThirdpartyAccessToken] = useRecoilState(
    ThirdpartyAccessTokenState
  )
  const [name, setName] = useRecoilState(NameState)
  const [email, setEmail] = useRecoilState(EmailState)
  const [signInType, setSignInType] = useRecoilState(SignInTypeState)

  /**
   * 유저 정보를 갱신합니다.
   */
  const updateUserInfo = ({ signInType, idToken, name, email, accessToken }: SignInResult) => {
    setSignInType(signInType)
    idToken && setIdToken(idToken)
    name && setName(name)
    email && setEmail(email)
    accessToken && setThirdpartyAccessToken(accessToken)
  }
  /**
   * 유저 정보를 제거합니다.
   */
  const clearUserInfo = () => {
    setIdToken('')
    setThirdpartyAccessToken('')
    setName('')
    setEmail('')
    setSignInType(undefined)
  }

  return { idToken, thirdpartyAccessToken, name, email, signInType, clearUserInfo, updateUserInfo }
}

export default useUserInfo
