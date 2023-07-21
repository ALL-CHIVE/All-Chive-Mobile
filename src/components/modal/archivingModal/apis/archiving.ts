import { client } from '@/apis/client'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

interface PostArchivingParams {
  title: string
  imageUrl: string
  category: string
  publicStatus: boolean
}

/**
 * 아카이빙을 생성합니다.
 */
export const postArchiving = async ({
  title,
  imageUrl,
  category,
  publicStatus,
}: PostArchivingParams) => {
  const accessToken = await getAccessToken()
  const response = await client.post('/archivings', {
    data: {
      title,
      imageUrl,
      category,
      publicStatus,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

interface PatchArchivingParams {
  archivingId: number
  title: string
  imageUrl: string
  category: string
  publicStatus: boolean
}

/**
 * 아카이빙을 수정합니다.
 */
export const patchArchiving = async ({
  archivingId,
  title,
  imageUrl,
  category,
  publicStatus,
}: PatchArchivingParams) => {
  const accessToken = await getAccessToken()
  const response = await client.patch(`/archivings/${archivingId}`, {
    data: {
      title,
      imageUrl,
      category,
      publicStatus,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
