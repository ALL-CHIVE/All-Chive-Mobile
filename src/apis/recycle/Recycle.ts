import { DeleteRecyclesRequest, RecyclesResponse } from '@/models/Recycle'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from '../client'

/**
 * 삭제된 아카이빙, 컨텐츠를 가져옵니다.
 */
export const getRecycles = async (): Promise<RecyclesResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/recycles`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 삭제된 아카이빙, 컨텐츠를 영구적으로 삭제합니다.
 */
export const deleteRecycles = async ({ archivingIds, contentIds }: DeleteRecyclesRequest) => {
  const accessToken = await getAccessToken()
  const response = await client.delete(`/recycles`, {
    data: {
      archivingIds,
      contentIds,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

/**
 * 삭제된 아카이빙, 컨텐츠를 복구합니다.
 */
export const patchRecycles = async ({ archivingIds, contentIds }: DeleteRecyclesRequest) => {
  const accessToken = await getAccessToken()
  const response = await client.patch(
    `/recycles`,
    {
      archivingIds,
      contentIds,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response
}
