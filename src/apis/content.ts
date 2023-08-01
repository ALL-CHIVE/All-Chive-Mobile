import { GetContentsResponse } from '@/models/Contents'
import { ContentType } from '@/models/enums/ContentType'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from './client'

interface PostContentsParams {
  contentType: ContentType
  archivingId: number
  title: string
  link?: string | ''
  imgUrl?: string | ''
  tagIds?: number[]
  memo?: string
}

/**
 * 컨텐츠를 생성합니다.
 */
export const postContents = async ({
  contentType,
  archivingId,
  title,
  link,
  imgUrl,
  tagIds,
  memo,
}: PostContentsParams) => {
  const accessToken = await getAccessToken()
  const response = await client.post(
    '/contents',
    {
      contentType,
      archivingId,
      title,
      link,
      imgUrl,
      tagIds,
      memo,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response
}

/**
 * 컨텐츠 내용을 가져옵니다.
 */
export const getContents = async (contentId: number | undefined): Promise<GetContentsResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/contents/${contentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 컨텐츠를 삭제합니다.
 */
export const deleteContents = async (contentId: number) => {
  const accessToken = await getAccessToken()
  const response = await client.delete(`/contents/${contentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
