import { ArchivingInfo } from '@/models/Archiving'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from '../Client'

/**
 * 아카이빙 정보 수정시 보여줄 정보를 가져옵니다.
 */
export const getArchivingData = async (archivingId: number): Promise<ArchivingInfo> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/archivings/${archivingId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 아카이빙을 생성합니다.
 */
export const postArchiving = async (
  title: string,
  imageUrl: string,
  category: string,
  publicStatus: boolean
) => {
  const accessToken = await getAccessToken()
  const response = await client.post(
    '/archivings',
    {
      title,
      imageUrl,
      category,
      publicStatus,
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
 * 아카이빙을 수정합니다.
 */
export const patchArchiving = async (
  archivingId: number,
  title: string,
  imageUrl: string,
  category: string,
  publicStatus: boolean
) => {
  const accessToken = await getAccessToken()
  const response = await client.patch(
    `/archivings/${archivingId}`,
    {
      title,
      imageUrl,
      category,
      publicStatus,
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
 * 아카이빙을 스크랩합니다.
 */
export const patchScrapArchiving = async (cancel: boolean, archivingId: number) => {
  const accessToken = await getAccessToken()
  const response = await client.patch(`/archivings/${archivingId}/scrap`, null, {
    params: {
      cancel,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

/**
 * 아카이빙을 고정합니다.
 */
export const patchPinArchiving = async (cancel: boolean, archivingId: number) => {
  const accessToken = await getAccessToken()
  const response = await client.patch(`/archivings/${archivingId}/pin`, null, {
    params: {
      cancel,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

/**
 * 아카이빙을 삭제합니다.
 */
export const deleteArchiving = async (archivingId: number) => {
  const accessToken = await getAccessToken()
  const response = await client.delete(`/archivings/${archivingId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
