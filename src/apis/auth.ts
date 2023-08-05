import { AutoSignInResponse } from '@/models/user/Auth'
import { saveTokens } from '@/services/SignInService'
import { getAccessToken, getRefreshToken } from '@/services/localStorage/LocalStorage'

import { client } from './client'

/**
 * 회원탈퇴를 합니다.
 */
export const deleteWithdrawal = async (appleAccessToken: string) => {
  const accessToken = await getAccessToken()
  const response = await client.delete(`/auth/withdrawal`, {
    data: {
      appleAccessToken,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

/**
 * 자동로그인 여부 확인
 */
export const canAuthSignIn = async () => {
  try {
    const refreshToken = await getRefreshToken()
    const { data } = await client.post(`/auth/token/refresh?refreshToken=${refreshToken}`)

    const tokens = data.data as AutoSignInResponse
    saveTokens(tokens.refreshToken, tokens.accessToken)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
