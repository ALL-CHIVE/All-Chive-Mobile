import { GetContentsResponse } from '@/models/contents/Contents'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from '../client'

/**
 * 콘텐츠를 가져옵니다.
 */
export const getContent = async (contentId: number | undefined): Promise<GetContentsResponse> => {
  const accessToken = await getAccessToken()
  const data = await client.get(`/contents/${contentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 컨텐츠를 삭제합니다.
 */
export const deleteContent = async (contentId: number) => {
  const accessToken = await getAccessToken()
  const response = await client.delete(`/contents/${contentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
