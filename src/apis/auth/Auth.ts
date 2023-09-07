import { api } from '@/apis'

/**
 * 회원탈퇴를 합니다.
 */
export const deleteWithdrawal = async (appleCode: string) => {
  const response = await api.delete(`/auth/withdrawal`, {
    params: {
      appleCode,
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
