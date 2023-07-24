import { GetTagResponse } from '@/models/tag/Tag'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from '../client'

/**
 * 모든 태그를 가져옵니다. (latest = true면 최근 사용한 태그를 가져옵니다.)
 */
export const getTag = async (latest: boolean) => {
  const accessToken = await getAccessToken()
  const { data } = await client.get<GetTagResponse>('/tags', {
    data: {
      latest,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data
}

/**
 * 태그를 추가합니다.
 */
export const postTag = async (name: string) => {
  const accessToken = await getAccessToken()
  const response = await client.post('/tags', {
    data: {
      name,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

/**
 * 태그를 삭제합니다.
 */
export const deleteTag = async (tagId: number) => {
  const accessToken = await getAccessToken()
  const response = await client.delete(`/tags/${tagId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

/**
 * 태그를 수정합니다.
 */
export const patchTag = async (tagId: number, name: string) => {
  const accessToken = await getAccessToken()
  const response = await client.patch(
    `/tags/${tagId}`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response
}
