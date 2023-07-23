import { UserResponse } from '@/models/user/profile'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from './client'

/**
 * checkNicknameValid
 */
export const checkNicknameValid = (nickname: string) => {
  return client.post(`/user/nickname`, { nickname })
}

/**
 * getProfile
 */
export const getProfile = async (): Promise<UserResponse> => {
  const accessToken = await getAccessToken()

  const { data } = await client.get(`/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}
