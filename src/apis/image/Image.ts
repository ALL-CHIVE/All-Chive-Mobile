import { ImageUrl } from '@/models/ImageUrl'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from '../Client'

/**
 * 프로필 이미지 업로드 url 요청할 수 있는 api
 */
export const getUserImageUrl = async (): Promise<ImageUrl> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/user/image`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 컨텐츠 이미지 업로드 url 요청할 수 있는 api
 */
export const getContentsImageUrl = async (): Promise<ImageUrl> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/contents/image`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 아카이빙 이미지 업로드 url 요청할 수 있는 api
 */
export const getArchivingImageUrl = async (): Promise<ImageUrl> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/archivings/image`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}
