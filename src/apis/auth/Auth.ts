import { api } from '@/apis'

/**
 * 회원탈퇴를 합니다.
 */
export const deleteWithdrawal = async (appleCode: string, quitReason: string) => {
  const response = await api.delete(`/auth/withdrawal`, {
    params: {
      appleCode,
      quitReason,
    },
  })

  return response
}

/**
 * 로그아웃합니다.
 */
export const logout = async () => {
  const response = await api.post(`/auth/logout`)
  return response
}
