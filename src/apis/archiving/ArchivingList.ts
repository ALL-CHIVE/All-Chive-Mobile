import {
  ArchivingListResponse,
  ContentByArchivingResponse,
  MainArchivingListResponse,
  PopularArchivingsResponse,
} from '@/models/Archiving'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from '../client'

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
  const { data } = await client.get(`/archivings/me/archiving`, {
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

  return data.data
}

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
  const { data } = await client.get(`/archivings`, {
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

  return data.data
}

/**
 * 가장 인기있는 아카이빙 5개를 가져옵니다
 */
export const getPopularArchivings = async (): Promise<PopularArchivingsResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/archivings/popular`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
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
 * 사용 중인 주제 & 아카이빙 리스트를 가져옵니다. (컨텐츠 추가 시 사용)
 */
export const getArchivingList = async (): Promise<ArchivingListResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get('/archivings/lists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}
