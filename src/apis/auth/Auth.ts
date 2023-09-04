import { api } from '@/apis'
import { AutoSignInResponse } from '@/models/user/Auth'
import { saveTokens } from '@/services/SignInService'
import { getAccessToken, getRefreshToken } from '@/services/localStorage/LocalStorage'

/**
 * 회원탈퇴를 합니다.
 */
export const deleteWithdrawal = async (appleCode: string) => {
  const accessToken = await getAccessToken()
  const response = await api.delete(`/auth/withdrawal`, {
    params: {
      appleCode,
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
    const { data } = await api.post(`/auth/token/refresh`, null, {
      params: {
        refreshToken,
      },
    })

    const tokens = data.data as AutoSignInResponse
    saveTokens(tokens.refreshToken, tokens.accessToken)
    return true
  } catch (error) {
    return false
  }
}

/**
 * 로그아웃합니다.
 */
export const logout = async () => {
  const accessToken = await getAccessToken()
  const response = await api.post(`/auth/logout`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
