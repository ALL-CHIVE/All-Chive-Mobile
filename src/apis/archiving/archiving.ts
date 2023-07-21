import { CommunityArchivingListResponse } from '@/models/archiving/CommunityArchivingList'
import { ContentByArchivingResponse } from '@/models/archiving/ContentByArchiving'
import { HomeArchivingListResponse } from '@/models/archiving/HomeArchivingList'
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
): Promise<CommunityArchivingListResponse> => {
  const data = await client({
    method: 'GET',
    url: `/archivings`,
    params: {
      category,
      page,
      size,
      sort,
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
): Promise<HomeArchivingListResponse> => {
  const data = await client({
    method: 'GET',
    url: `/archivings/me/archiving`,
    params: {
      category,
      page,
      size,
      sort,
    },
    headers: getAccessToken ? { Authorization: `Bearer ${getAccessToken()}` } : {},
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
  const data = await client({
    method: 'GET',
    url: `/archivings/${archivingId}/contents`,
    params: {
      page,
      size,
      sort,
    },
  })

  return data.data
}

/**
 * 아카이빙을 삭제합니다.
 */
export const deleteArchiving = async (archivingId: number) => {
  const response = await client({
    method: 'DELETE',
    url: `/archivings/${archivingId}`,
  })

  return response
}
