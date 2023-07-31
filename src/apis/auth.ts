import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from './client'

/**
 * 회원탈퇴를 합니다.
 */
export const deleteWithdrawal = async (appleAccessToken: string) => {
  const accessToken = await getAccessToken()
  const response = await client.delete(`/auth.withdrawal`, {
    data: {
      appleAccessToken,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
