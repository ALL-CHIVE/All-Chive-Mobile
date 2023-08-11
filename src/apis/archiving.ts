import {
  ArchivingListContent,
  ArchivingListResponse,
  ContentByArchivingResponse,
  MainArchivingListResponse,
} from '@/models/Archiving'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from './client'

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
 * 아카이빙 정보 수정시 보여줄 정보를 가져옵니다.
 */
export const getArchivingData = async (archivingId: number): Promise<ArchivingListContent> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/archivings/${archivingId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
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
  const response = await client.patch(
    `/archivings/${archivingId}/scrap?cancel=${cancel}`,
    { cancel, archivingId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response
}

/**
 * 아카이빙을 고정합니다.
 */
export const patchPinArchiving = async (cancel: boolean, archivingId: number) => {
  const accessToken = await getAccessToken()
  const response = await client.patch(
    `/archivings/${archivingId}/pin?cancel=${cancel}`,
    { cancel, archivingId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

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
