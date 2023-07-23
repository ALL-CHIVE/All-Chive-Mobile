import { BlockResponse } from '@/models/block/Block'
import { BlockListResponse } from '@/models/block/BlockList'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from './client'

/**
 * 차단한 유저 정보를 가져옵니다.
 */
export const getBlockList = async (): Promise<BlockListResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/blocks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return data
}

/**
 * 유저를 차단합니다.
 */
export const postBlock = async (userId: number): Promise<BlockResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await client.post(
    `/blocks`,
    {
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return data
}

/**
 * 유저 차단을 해제합니다.
 */
export const deleteBlock = async (userId: number): Promise<BlockResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await client.delete(`/blocks`, {
    data: {
      userId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data
}
