import { ContentByArchivingResponse } from '@/models/archiving/ContentByArchiving'
import { MainArchivingListResponse } from '@/models/archiving/MainArchivingList'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from '../client'

/**
 * 커뮤니티의 카테고리별 아카이빙 리스트를 가져옵니다.
 */
export const getCommunityArchivingList = async (
  category: string,
  page?: number,
  size?: number,
  sort?: Array<string>
): Promise<MainArchivingListResponse> => {
  const accessToken = await getAccessToken()
  const response = await client.get(`/archivings`, {
    params: {
      category,
      page,
      size,
      sort,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data.data
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

/**
 * 아카이빙을 스크랩합니다.
 */
export const patchScrapArchiving = async (cancel: boolean, archivingId: number) => {
  const accessToken = await getAccessToken()
  const response = await client.patch(`/archivings/${archivingId}/scrap?cancel=${cancel}`, {
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
  const response = await client.patch(`/archivings/${archivingId}/pin?cancel=${cancel}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

/**
 * 아카이빙별 컨텐츠 리스트를 가져옵니다.
 */
export const getContentByArchiving = async (
  archivingId: number,
  page?: number,
  size?: number,
  sort?: Array<string>
): Promise<ContentByArchivingResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/archivings/${archivingId}/contents`, {
    params: {
      page,
      size,
      sort,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 스크랩 주제별 아카이빙 리스트를 가져옵니다.
 */
export const getScrapArchivingList = async (
  category: string,
  page?: number,
  size?: number
): Promise<MainArchivingListResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/archivings/me/scrap`, {
    params: {
      category,
      page,
      size,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 내 아카이빙 카테고리별 아카이빙 리스트를 가져옵니다.
 */
export const getHomeArchivingList = async (
  category: string,
  page?: number,
  size?: number,
  sort?: Array<string>
): Promise<MainArchivingListResponse> => {
  const accessToken = await getAccessToken()
  const response = await client.get(`/archivings/me/archiving`, {
    params: {
      category,
      page,
      size,
      sort,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data.data
}
